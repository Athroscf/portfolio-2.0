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
      image: "/imgs/eg.jpg",
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
      image: "/imgs/cex.webp",
      description:
        "Contributed to projects throughout the software development lifecycle, focusing on design, DevOps, and database management. Collaborated with teams to ensure high-quality deliverables and optimized workflows.",
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
      image: "/imgs/mbh.png",
      description:
        "Led a team in technology projects, including the hotel’s website design and launch, PBX system management, and an AI-driven room access prototype. Contributed to software development for the hotel’s bar, enhancing guest experience and operational efficiency.",
      technologies: ["React", "NextJS", "Gatsby", "Node.js", "AWS", "GraphQL"],
    },
  ],
};

export const projects: EPSection = {
  sectionTitle: "projects",
  sectionDescription:
    "Here you will find some of the projects that I have developed for different clients.",
  cards: [
    {
      title: "Best Home Builders",
      description:
        "Designed and developed the company's portfolio website with SEO optimizations, along with designing company's brand including the logo.",
      technologies: ["AWS", "Next.js", "Sanity"],
      image: "/imgs/bhb-logo.png",
      link: "https://besthomebuilders.net/"
    },
    {
      title: "Consel Honduras",
      description:
        "Designed and developed the company's portfolio website with SEO optimizations, along with designing company's brand including the logo.",
      technologies: ["AWS", "Next.js", "Sanity"],
      image: "/imgs/consel-logo.png",
      link: "https://conselhonduras.com/"
    },
    {
      title: "Minister Business Hotel Bar's Software",
      description:
        "Contributed to the development of software for the hotel’s bar, improving guest experience and operational efficiency.",
      technologies: ["Ionic Framework/React", "AWS", "Redux Toolkit"],
      image: "/imgs/mbh.png",
      link: "https://www.ministerbusiness.com/"
    },
    {
      title: "Minister Business Hotel's AI-Powered Room Access Solution (Prototype)",
      description:
        "Developed an innovative AI-powered prototype that enables guests to access their rooms seamlessly using AI.",
      technologies: ["NodeJS", "TensorFlow"],
      image: "/imgs/mbh.png",
      link: "https://www.ministerbusiness.com/"
    },
    {
      title: "Minister Business Hotel's Website",
      description:
        "Designed and developed the hotel’s website, focusing on user experience and functionality.",
      technologies: ["NextJS", "AWS", "DynamoDB", "Redux Toolkit"],
      image: "/imgs/mbh.png",
      link: "https://www.ministerbusiness.com/"
    },
    {
      title: "Minister Business Hotel's PBX",
      description:
        "Reengineered and optimized the PBX system for improved performance and reliability.",
      technologies: ["FreePBX"],
      image: "/imgs/mbh.png",
      link: "https://www.ministerbusiness.com/"
    },
  ],
};

export const collaborations: EPSection = {
  sectionTitle: "contributions",
  sectionDescription: "Here you will find some of the projects that I have contributed for different clients.",
  cards: [
    {
      title: "Stellantis",
      description:
        "Contributed in enhancements for the company's website, focusing on improving user experience.",
      technologies: ["Vue"],
      image: "/imgs/stellantis-logo.png",
      link: "https://www.stellantis.com"
    },
    {
      title: "Wendy's App",
      description:
        "Contributed in the development of orders and payment enhancements for app focusing on improving user experience and app's performance.",
      technologies: ["Vue"],
      image: "/imgs/wendys-logo.png",
      link: "https://www.wendys.com/"
    },
    {
      title: "CODE Exitos Website",
      description:
        "Designed and developed enhancements for the company's website, focusing on improving user experience.",
      technologies: ["Vue"],
      image: "/imgs/cex.webp",
      link: "https://codexitos.com/"
    },
    {
      title: "CODE Exitos Internal App",
      description:
        "Developed, refined, and designed features for the company's internal systems, enhancing functionality and user experience.",
      technologies: ["Vue"],
      image: "/imgs/cex.webp",
      link: "https://codexitos.com/"
    },
    {
      title: "IBAO",
      description:
        "Completed the development and ongoing maintenance of the IBAO website and platform, ensuring optimal performance and user engagement.",
      technologies: [".Net", "Azure", "Postgres"],
      image: "/imgs/ibao.png",
      link: "https://theibao.com/"
    },
    {
      title: "AFLS",
      description:
        "Developed features to enhance user experience and introduced new functionalities to address client requirements effectively.",
      technologies: [".Net", "Azure", "Postgres"],
      image: "/imgs/afls.png",
      link: "https://assessments.centralreach.com/"
    },
  ]
}

export const skills: Skill[] = [
  { name: "JavaScript", level: 90, color: "from-yellow-400 to-yellow-600" },
  { name: "React", level: 90, color: "from-blue-400 to-blue-600" },
  { name: "Node.js", level: 80, color: "from-green-400 to-green-600" },
  { name: "Python", level: 70, color: "from-blue-500 to-blue-700" },
  { name: "SQL", level: 80, color: "from-orange-400 to-orange-600" },
  { name: "HTML/CSS", level: 95, color: "from-red-400 to-red-600" },
];
