import { Button } from "@/components/ui/button";
import { useActiveSection } from "../context-provider";
import { useTheme } from "../theme-provider";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Wordpress",
  "PHP",
  "SASS",
  "GIT",
  "Github",
  "Responsive Design",
  "SEO",
  "Terminal",
];

const About = () => {
  const { scrollTo } = useActiveSection();
  const { theme } = useTheme();

  return (
    <section id="about" className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto px-12">
        <h2 className="mb-8 text-center text-3xl font-bold">ABOUT ME</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center">
          Here you will find more information about me, what I do, and my current skills mostly in
          terms of programming and technology.
        </p>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Get to know me!</h3>
            <p className="mb-4 text-justify">
              I&apos;m a Frontend Focused Web Developer building and managing the Front-end of
              Websites Websites and Web Applications that leads to the success of the overall
              product. Check of my work in the Projects section.
            </p>
            <p className="mb-4 text-justify">
              I also like sharing content related to the stuff that I have learned over the years in
              Web Development so it can help other people of the Dev Community. Feel free to Connect
              or Follow me on my LinkedIn and Instagram where I post useful content related to Web
              Development and Programming
            </p>
            <p className="text-justify">
              I&apos;m open to Job opportunities where I can contribute, learn and grow. If you have
              a good opportunity that matches my skills and experience then don&apos;t hesitate to
              contact me.
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
                <span key={skill} className={`${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'} px-3 py-1 rounded-full text-sm transition-colors duration-300`}>
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
