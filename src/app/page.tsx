"use client";

import { collaborations, experiences, projects } from "../../public/imgs/content";
import About from "./components/About";
import Intro from "./components/Intro";
import EP from "./components/EP";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center text-gray-800 dark:text-white">
      <main className="w-full">
        <Intro />
        <About />
        <EP
          title={projects.sectionTitle}
          description={projects.sectionDescription}
          cards={projects.cards}
        />
        <EP
          title={collaborations.sectionTitle}
          description={collaborations.sectionDescription}
          cards={collaborations.cards}
        />
        <EP
          title={experiences.sectionTitle}
          description={experiences.sectionDescription}
          cards={experiences.cards}
        />
      </main>
    </div>
  );
}
