"use client";

import { experiences, projects } from "@/lib/content";
import About from "./components/About";
import Intro from "./components/Intro";
import EP from "./components/EP";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center text-gray-800 dark:text-white">
      <main>
        <Intro />
        <About />
        <section id="work" className="py-20">
          <h2 className="mb-4 text-3xl font-semibold dark:text-white">Work Experience</h2>
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
        <section id="projects" className="py-20">
          <h2 className="mb-4 text-3xl font-semibold dark:text-white">Projects</h2>
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
