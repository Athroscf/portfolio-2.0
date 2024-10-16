import { Experience, Project, Skill } from "@/app/types";

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
    title: "Elegancia & Comfort Internal App",
    description:
      "Developed a custom internal web application using Next.js, Redux Toolkit, GraphQL, and AWS to streamline company operations, resulting in improved workflow efficiency and user experience.",
    technologies: ["AWS", "Cognito", "DynamoDB", "GraphQL", "Next.js", "Redux Toolkit"],
    image: "/eg.png",
  },
  {
    title: "CODE Exitos Website",
    description: "Develop features for company's internal use.",
    technologies: ["Vue"],
    image: "/ibao.png",
  },
  {
    title: "IBAO",
    description: "Finish development and maintained the IBAO website and platform.",
    technologies: [".Net", "Azure", "Postgres"],
    image: "/eg.png",
  },
  {
    title: "AFLS",
    description:
      "Developed features for user experience and new functionalities that solve client's requirements.",
    technologies: [".Net", "Azure", "Postgres"],
    image: "/eg.png",
  },
];

export const skills: Skill[] = [
  { name: "JavaScript", level: 90, color: "from-yellow-400 to-yellow-600" },
  { name: "React", level: 85, color: "from-blue-400 to-blue-600" },
  { name: "Node.js", level: 80, color: "from-green-400 to-green-600" },
  { name: "Python", level: 75, color: "from-blue-500 to-blue-700" },
  { name: "SQL", level: 70, color: "from-orange-400 to-orange-600" },
  { name: "HTML/CSS", level: 95, color: "from-red-400 to-red-600" },
];
