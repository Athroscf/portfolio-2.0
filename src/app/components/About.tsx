import { Button } from "@/components/ui/button";
import { useActiveSection } from "../context-provider";
import { useTheme } from "../theme-provider";
import DividerLine from "./DividerLine";

const skills = [
  "React",
  "NextJS",
  "NodeJS",
  "Typescript",
  "Redux/Redux Toolkit",
  "GraphQL",
  "REST API",
  "Apollo",
  "NestJS",
  "Cypress",
  "GIT",
  "AWS",
  "Docker",
  "SQL",
  "NoSQL",
  "Python",
  "React Native",
];

const About = () => {
  const { scrollTo } = useActiveSection();
  const { theme } = useTheme();

  return (
    <section
      id="about"
      className={`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-white"} rounded-lg transition-colors duration-300`}
    >
      <div className="container mx-auto px-12">
        <h2 className="mb-8 text-center text-3xl font-bold">ABOUT ME</h2>
        <DividerLine />
        <p className="mx-auto mb-12 max-w-2xl text-center">
          Here you will find more information about me, what I do, and my current skills mostly in
          terms of programming and technology.
        </p>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Get to know me!</h3>
            <p className="mb-4 text-justify">
              I am a Full-Stack Web Developer specializing in building and managing the front-end
              and back-end of websites and web applications, contributing to the overall success of
              the product. Check out my work in the Projects section.
            </p>
            <p className="mb-4 text-justify">
              Feel free to Connect with me or Follow me on my LinkedIn and X.
            </p>
            <p className="text-justify">
              I am open to job opportunities where I can contribute, learn, and grow, especially in
              roles involving full-stack development and cloud solutions. If you have an opportunity
              that aligns with my skills and experience, please don’t hesitate to reach out!
            </p>
            <Button
              className="mt-4 bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => scrollTo("contact")}
            >
              CONTACT ME
            </Button>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">My Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"} rounded-full px-3 py-1 text-sm transition-colors duration-300`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
