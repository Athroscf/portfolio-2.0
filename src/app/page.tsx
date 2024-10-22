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
        <EP
          title={experiences.sectionTitle}
          description={experiences.sectionDescription}
          cards={experiences.cards}
        />
        <EP
          title={projects.sectionTitle}
          description={projects.sectionDescription}
          cards={projects.cards}
        />
      </main>
    </div>
  );
}
