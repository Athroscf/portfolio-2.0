"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center text-gray-800 dark:text-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/50 to-black/50"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="animate-fade-in-down mb-4 text-5xl font-bold text-white md:text-7xl">
          Christopher Fiallos
        </h1>
        <h2 className="animate-fade-in-down mb-4 text-3xl font-bold text-white md:text-5xl">
          Fullstack Developer
        </h2>
        <p className="animate-fade-in-up mb-8 max-w-2xl text-xl text-white md:text-2xl">
          Welcome to my portfolio. I&apos;m a fullstack developer passionate about creating
          efficient and user-friendly web applications.
        </p>
        <Button size="lg" className="animate-fade-in bg-blue-600 text-white hover:bg-blue-700">
          LEARN MORE
        </Button>
      </motion.div>
    </div>
  );
}
