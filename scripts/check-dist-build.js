#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
// Map of categories -> source folder inside src
const CATEGORY_DIRS = {
  components: path.join(projectRoot, "src", "components"),
  // hooks: path.join(projectRoot, "src", "hooks"),
  // utils: path.join(projectRoot, "src", "lib"),
  // pages: path.join(projectRoot, "src", "pages"),
  // services: path.join(projectRoot, "src", "services"),
};

const extensions = [".tsx"];

function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

async function listFilesRec(dir) {
  const results = [];
  try {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        const nested = await listFilesRec(full);
        results.push(...nested);
      } else if (ent.isFile()) {
        results.push(full);
      }
    }
  } catch (err) {
    // ignore missing directories
  }
  return results;
}

async function collectComponentNames() {
  // Return an object: { category: [names...] }
  const result = {};
  for (const [category, srcDir] of Object.entries(CATEGORY_DIRS)) {
    const names = new Set();
    try {
      const files = await listFilesRec(srcDir);
      for (const f of files) {
        const ext = path.extname(f);
        if (!extensions.includes(ext)) continue;
        const base = path.basename(f, ext);
        if (!base) continue;
        if (base.toLowerCase() === "index") {
          const parent = path.basename(path.dirname(f));
          if (parent) names.add(parent);
        } else {
          names.add(base);
        }
      }
    } catch (err) {
      // ignore missing category folder
    }
    result[category] = Array.from(names).sort((a, b) => a.localeCompare(b));
  }
  return result;
}

async function collectDistFiles() {
  const files = await listFilesRec(distDir);
  return files;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function startSpinner(message) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  const id = setInterval(() => {
    process.stdout.write("\r" + frames[i % frames.length] + " " + message);
    i++;
  }, 80);
  return () => {
    clearInterval(id);
    process.stdout.write("\r");
  };
}

function matchComponentInDist(componentName, distFiles) {
  const kebab = toKebab(componentName);
  const lower = componentName.toLowerCase();

  for (const f of distFiles) {
    const fileName = path.basename(f, path.extname(f));
    const fileNameLower = fileName.toLowerCase();
    // exact matches
    if (fileName === componentName) return true;
    if (fileNameLower === lower) return true;
    if (fileNameLower === kebab) return true;
    //  based: path segments
    const segments = f.split(path.sep).map((s) => s.toLowerCase());
    if (segments.includes(lower) || segments.includes(kebab)) return true;
    if (fileNameLower.includes(lower) || fileNameLower.includes(kebab))
      return true;
  }
  return false;
}

function color(text, code) {
  return `\u001b[${code}m${text}\u001b[0m`;
}

function green(text) {
  return color(text, 32);
}
function red(text) {
  return color(text, 31);
}
function yellow(text) {
  return color(text, 33);
}
function dim(text) {
  return color(text, 2);
}

function printSectionHeader(title) {
  console.log(`\n${dim("────────────────────────────────────────────")}`);
  console.log(` ${yellow(title)}`);
  console.log(`${dim("────────────────────────────────────────────")}`);
}

async function main() {
  console.log("Verificando build dos componentes em:", distDir);
  const args = process.argv.slice(2);
  const verbose = args.includes("--verbose") || args.includes("-v");
  const details = args.includes("--details") || args.includes("-d");
  const componentsByCategory = await collectComponentNames();

  let distFiles = [];
  try {
    distFiles = await collectDistFiles();
  } catch (err) {
    // ignore
  }

  if (!distFiles || distFiles.length === 0) {
    console.log(
      "Atenção: diretório `dist` está vazio ou não existe. Nenhum arquivo buildado encontrado."
    );
  }

  const distContents = [];
  if (distFiles && distFiles.length > 0) {
    const stop = startSpinner("⏳ Lendo arquivos de `dist`...");
    for (let i = 0; i < distFiles.length; i++) {
      const f = distFiles[i];
      try {
        const content = await fs.promises.readFile(f, "utf8");
        distContents.push({ path: f, content });
      } catch (err) {}
    }
    stop();
    console.log(
      ` 📦 ${distContents.length} arquivos de texto carregados de dist`
    );
  }
  // For each category, check names
  const overall = {
    total: 0,
    built: 0,
    notBuilt: 0,
    categories: {},
  };

  for (const [category, names] of Object.entries(componentsByCategory)) {
    const catResult = { built: [], notBuilt: [] };
    overall.categories[category] = catResult;
    for (let idx = 0; idx < names.length; idx++) {
      const name = names[idx];
      overall.total++;
      let found = false;
      try {
        found = matchComponentInDist(name, distFiles);
      } catch (e) {
        found = false;
      }

      if (!found && distContents.length > 0) {
        const kebab = toKebab(name);
        const esc = escapeRegExp(name);
        const escKebab = escapeRegExp(kebab);

        const patterns = [
          new RegExp(`\\b${esc}\\b`, "i"),
          new RegExp(escKebab, "i"),
          new RegExp(`export\\s+default\\s+${esc}`, "i"),
          new RegExp(`export\\s+\\{[\\s\\S]*${esc}[\\s\\S]*\\}`, "i"),
          new RegExp(`exports\\.${esc}`, "i"),
        ];

        for (const d of distContents) {
          if (!d.content) continue;
          for (const p of patterns) {
            if (p.test(d.content)) {
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }

      if (found) {
        catResult.built.push(name);
        overall.built++;
      } else {
        catResult.notBuilt.push(name);
        overall.notBuilt++;
      }

      if (verbose) {
        const mark = found ? green("✅") : red("❌");
        console.log(` ${mark} [${category}] ${name}`);
      }
    }
  }

  // Print visual summary
  console.log();
  printSectionHeader("Resumo de build por categoria");
  console.log(` Total verificados: ${overall.total}`);
  console.log(
    ` ${green("Buildados:")} ${overall.built}    ${red("Nao buildados:")} ${
      overall.notBuilt
    }`
  );

  for (const [category, res] of Object.entries(overall.categories)) {
    const builtCount = res.built.length;
    const notCount = res.notBuilt.length;
    printSectionHeader(
      `${category.toUpperCase()} — ${green(builtCount + " ✅")} / ${red(
        notCount + " ❌"
      )}`
    );

    if (builtCount > 0) {
      console.log(green(" Buildados:"));
      for (const b of res.built) console.log(`  - ${b}`);
    } else {
      console.log(dim("  (nenhum buildado)"));
    }

    if (notCount > 0) {
      console.log(red(" Nao buildados:"));
      for (const n of res.notBuilt) console.log(`  - ${n}`);
    }
  }

  if (details) {
    console.log();
    printSectionHeader("Detalhes (arquivos dist encontrados)");
    for (const d of distContents.slice(0, 200)) {
      console.log(` - ${path.relative(projectRoot, d.path)}`);
    }
    if (distContents.length === 0)
      console.log(dim(" (nenhum arquivo de texto lido em dist)"));
  }

  process.exit(overall.notBuilt === 0 ? 0 : 2);
}

main().catch((err) => {
  console.error("Erro ao executar verificação:", err);
  process.exit(3);
});
