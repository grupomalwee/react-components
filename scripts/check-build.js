const fs = require("fs");
const path = require("path");

const distPath = path.join(__dirname, "..", "dist");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  const fullPath = path.join(distPath, filePath);
  const exists = fs.existsSync(fullPath);

  if (exists) {
    const stats = fs.statSync(fullPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    log(`✓ ${description}: ${filePath} (${sizeKB} KB)`, colors.green);
    return true;
  } else {
    log(`✗ ${description}: ${filePath} não encontrado`, colors.red);
    return false;
  }
}

function checkFileContent(filePath, checks) {
  const fullPath = path.join(distPath, filePath);

  if (!fs.existsSync(fullPath)) {
    return false;
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  let allPassed = true;

  checks.forEach(({ pattern, description }) => {
    const found = pattern.test(content);
    if (found) {
      log(`  ✓ ${description}`, colors.green);
    } else {
      log(`  ✗ ${description}`, colors.red);
      allPassed = false;
    }
  });

  return allPassed;
}

function main() {
  log("\n🔍 Verificando build do react-components...\n", colors.blue);

  let allChecks = true;

  if (!fs.existsSync(distPath)) {
    log("✗ Diretório dist/ não encontrado!", colors.red);
    log('Execute "npm run build" primeiro.\n', colors.yellow);
    process.exit(1);
  }

  log("📦 Verificando arquivos essenciais:\n", colors.blue);

  const essentialFiles = [
    { path: "index.js", description: "Build CJS" },
    { path: "index.mjs", description: "Build ESM" },
    { path: "index.d.ts", description: "Type Definitions (CJS)" },
    { path: "index.d.mts", description: "Type Definitions (ESM)" },
  ];

  essentialFiles.forEach(({ path, description }) => {
    if (!checkFileExists(path, description)) {
      allChecks = false;
    }
  });

  log("\n📝 Verificando conteúdo dos arquivos:\n", colors.blue);

  log("Verificando index.js:", colors.blue);
  const jsContentChecks = checkFileContent("index.js", [
    { pattern: /"use client"/, description: '"use client" directive presente' },
    { pattern: /exports\./m, description: "Exports definidos" },
  ]);

  if (!jsContentChecks) {
    allChecks = false;
  }

  log("\nVerificando index.mjs:", colors.blue);
  const mjsContentChecks = checkFileContent("index.mjs", [
    { pattern: /"use client"/, description: '"use client" directive presente' },
    {
      pattern: /import ['"]\.\/index\.css['"]/,
      description: "CSS import presente",
    },
    { pattern: /export \{/m, description: "Exports definidos" },
  ]);

  if (!mjsContentChecks) {
    allChecks = false;
  }

  log("\nVerificando index.d.ts:", colors.blue);
  const dtsContentChecks = checkFileContent("index.d.ts", [
    { pattern: /export \{[\s\S]*\}/m, description: "Type exports definidos" },
  ]);

  if (!dtsContentChecks) {
    allChecks = false;
  }

  const cssPath = path.join(distPath, "index.css");
  if (fs.existsSync(cssPath)) {
    const cssStats = fs.statSync(cssPath);
    const cssSizeKB = cssStats.size / 1024;

    log("\nVerificando CSS:", colors.blue);
    if (cssSizeKB < 10) {
      log(
        `  ✗ CSS muito pequeno (${cssSizeKB.toFixed(2)} KB), pode estar incompleto`,
        colors.red,
      );
      allChecks = false;
    } else {
      log(
        `  ✓ CSS tem tamanho adequado (${cssSizeKB.toFixed(2)} KB)`,
        colors.green,
      );
    }
  }

  log("\n" + "=".repeat(50) + "\n", colors.blue);

  if (allChecks) {
    log(
      "✅ Build verificado com sucesso! Todos os arquivos estão OK.\n",
      colors.green,
    );
    process.exit(0);
  } else {
    log("❌ Build possui problemas! Verifique os erros acima.\n", colors.red);
    log("💡 Dicas para resolver:", colors.yellow);
    log("  1. Execute: npm run clean", colors.yellow);
    log("  2. Execute: npm run build", colors.yellow);
    log(
      "  3. Se o problema persistir, delete node_modules e reinstale\n",
      colors.yellow,
    );
    process.exit(1);
  }
}

main();
