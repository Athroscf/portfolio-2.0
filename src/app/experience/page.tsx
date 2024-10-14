import { experiences, projects } from "@/lib/content";
import EP from "../components/EP";

export default function ExperienceProjects() {
  return (
    <div className="rounded-lg bg-opacity-90 p-8 shadow-lg dark:bg-gray-800 dark:bg-opacity-90">
      <h1 className="mb-6 text-center text-3xl font-bold text-white dark:text-white">
        Experience & Projects
      </h1>
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-white dark:text-white">Work Experience</h2>
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
        <h2 className="mb-4 text-2xl font-semibold text-white dark:text-white">Work Experience</h2>
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
    </div>
  );
}
