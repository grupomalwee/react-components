import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const meta: Meta = {
  title: "Home",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <main className="relative overflow-hidden flex items-center justify-center px-6 py-12 min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto rounded-2xl  p-12 text-center"
      >
        <motion.img
          src="/pwa-512x512.png"
          alt="Logo Malwee"
          className="w-28 h-28 mx-auto mb-6"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.9 }}
        />

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
          <span className="text-primary">Malwee React Components</span>
        </h1>

        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Um hub visual de componentes construído com React + Tailwind. Leve,
          acessível e pronto para protótipos.
        </p>

        <div className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">
          Abra os stories individuais para explorar cada componente e seus
          estados.
        </div>

        <VersionBadge />
      </motion.section>
    </main>
  ),
};

function VersionBadge() {
  const packageName = "@mlw-packages/react-components";
  const [version, setVersion] = useState<string | null>(null);

  async function fetchLatest() {
    try {
      const encoded = encodeURIComponent(packageName);
      const res = await fetch(`https://registry.npmjs.org/${encoded}/latest`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json && json.version) {
        setVersion(String(json.version));
      } else {
        throw new Error("Versão não encontrada na resposta");
      }
    } catch {
      setVersion(null);
    } finally {
      // no-op
    }
  }

  useEffect(() => {
    fetchLatest();
    const t = setInterval(fetchLatest, 1000 * 60 * 10);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mt-6 flex items-center justify-center gap-3 flex-col">
      <div className="inline-flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border rounded px-3 py-2 text-sm">
        Versão:&nbsp;
        <a
          className="text-sm font-semibold text-primary hover:underline"
          href={`https://www.npmjs.com/package/${packageName}`}
          target="_blank"
          rel="noreferrer"
        >
          {version ?? "—"}
        </a>
      </div>
    </div>
  );
}
