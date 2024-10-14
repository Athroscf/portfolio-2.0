import { Experience, Project } from "@/app/types";

export const experiences: Experience[] = [
  {
    title: "Software Developer",
    company: "CODE Exitos",
    period: "2022 - 2023",
    description: "Develop and maintain solutions that optimizes the client's products.",
    technologies: [
      "React",
      "NextJS",
      "Vue",
      "Node.js",
      ".Net",
      "AWS",
      "Azure",
      "Docker",
      "Postgres",
      "Mongo",
    ],
  },
  {
    title: "IT Manager",
    company: "Minister Business Hotel",
    period: "2021 - 2022",
    description:
      "Manage a team so that it can be able to build and maintain PBX, Network, and Software solutions for the hotel and its services.",
    technologies: ["React", "NextJS", "Gatsby", "Node.js", "AWS", "GraphQL"],
  },
];

export const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "Built a full-featured e-commerce platform using MERN stack.",
    technologies: ["MongoDB", "Express", "React", "Node.js"]
  },
  {
    title: "Task Management App",
    description: "Developed a real-time task management application using React and Firebase.",
    technologies: ["React", "Firebase", "Material-UI"]
  },
];
