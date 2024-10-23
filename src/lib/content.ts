import { EPSection, Skill } from "@/app/types";

export const experiences: EPSection = {
  sectionTitle: "roles",
  sectionDescription:
    "Here you will find some of my previous roles as a Software Engineer at different companies.",
  cards: [
    {
      title: "Fullstack Developer",
      company: "Elegancia & Comfort",
      period: "2024",
      description:
        "Developed and implemented an internal software solution for Elegancia & Comfort, enhancing the company’s employee management, inventory tracking, and sales processes. This comprehensive system streamlined operations, improved data accessibility, and facilitated better decision-making.",
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
      title: "Software Developer",
      company: "CODE Exitos",
      period: "2022 - 2023",
      description:
        "Played a key role as a Software Developer, contributing to multiple projects across various stages of the software development lifecycle. My responsibilities included designing and organizing development processes, implementing DevOps practices, and overseeing database design and maintenance. By collaborating with diverse teams, I ensured high-quality deliverables and optimized project workflows, ultimately enhancing the company’s capability to meet client needs effectively.",
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
        "Led a team to develop and implement various technology projects. Key achievements included designing and launching the hotel’s website, building and maintaining a PBX system, and creating an innovative software solution that allowed guests to access their rooms using AI technology. Additionally, contributed to the development of software for the hotel’s bar, enhancing overall guest experience and operational efficiency.",
      technologies: ["React", "NextJS", "Gatsby", "Node.js", "AWS", "GraphQL"],
    },
  ],
};

export const projects: EPSection = {
  sectionTitle: "projects",
  sectionDescription:
    "Here you will find some of the personal and clients projects that I created with each project containing its own case study",
  cards: [
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
    {
      title: "AFLS",
      description:
        "Developed features for user experience and new functionalities that solve client's requirements.",
      technologies: [".Net", "Azure", "Postgres"],
      image: "/eg.png",
    },
  ],
};

export const skills: Skill[] = [
  { name: "JavaScript", level: 90, color: "from-yellow-400 to-yellow-600" },
  { name: "React", level: 90, color: "from-blue-400 to-blue-600" },
  { name: "Node.js", level: 80, color: "from-green-400 to-green-600" },
  { name: "Python", level: 70, color: "from-blue-500 to-blue-700" },
  { name: "SQL", level: 80, color: "from-orange-400 to-orange-600" },
  { name: "HTML/CSS", level: 95, color: "from-red-400 to-red-600" },
];
