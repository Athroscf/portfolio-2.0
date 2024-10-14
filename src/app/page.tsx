"use client";

import { experiences, projects } from "@/lib/content";
import About from "./components/About";
import Intro from "./components/Intro";
import { useState } from "react";
import EP from "./components/EP";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center text-gray-800 dark:text-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/50 to-black/50"></div>
      <main>
        <Intro scrollTo={scrollTo} />
        <About scrollTo={scrollTo} />
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold dark:text-white">Work Experience</h2>
          <div className="space-y-6">
            {experiences.map((item, index) => (
              <EP
                key={`${index}-${item.title}`}
                title={item.title}
                description={item.description}
                technologies={item.technologies}
                company={item.company}
                period={item.period}
              />
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold dark:text-white">Projects</h2>
          <div className="space-y-6">
            {projects.map((item, index) => (
              <EP
                key={`${index}-${item.title}`}
                title={item.title}
                description={item.description}
                technologies={item.technologies}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
