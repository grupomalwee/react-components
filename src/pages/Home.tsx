"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-[hsl(231,15%,19%)]  text-neutral-900 dark:text-white flex items-center px-96">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center flex flex-col items-center gap-6 max-w-2xl"
      >
        <motion.img
          src="public/pwa-512x512.png"
          alt="Logo Malwee"
          className="w-28 h-28 rounded-xl  hover:scale-105 transition-all"
          whileHover={{ rotate: [0, 2, -2, 0] }}
        />

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Bem-vindo ao <br />
          <span className="text-primary">
            Malwee React Components
          </span>
        </h1>

        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
          Sistema de design componetizado, prático e escalável com React +
          Tailwind.
        </p>
      </motion.div>
    </main>
  );
}
