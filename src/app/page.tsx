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
        <section id="work" className="pt-10">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold dark:text-white">Work Experience</h2>
            <div className="space-y-12">
              {experiences.map((item, index) => (
                <EP
                  key={`${index}-${item.title}`}
                  index={index}
                  title={item.title}
                  description={item.description}
                  technologies={item.technologies}
                  company={item.company}
                  period={item.period}
                />
              ))}
            </div>
          </div>
        </section>
        <section id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="mb-4 text-3xl font-semibold dark:text-white">Projects</h2>
            <div className="space-y-6">
              {projects.map((item, index) => (
                <EP
                  key={`${index}-${item.title}`}
                  index={index}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  technologies={item.technologies}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
