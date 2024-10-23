import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useActiveSection } from "../context-provider";
import AnimatedDot from "@/app/components/AnimatedDot";
import { useTheme } from "../theme-provider";

const Intro = () => {
  const { scrollTo } = useActiveSection();
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className={`flex min-h-screen flex-col items-center justify-center ${theme === "dark" ? 'bg-[url("/dark-background.jpg")]' : 'bg-[url("/light-background.jpg")]'}`}
    >
      {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-black/50 z-0"></div> */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-4xl font-bold md:text-6xl"
        >
          Hello, I&apos;m Christopher Fiallos
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto mb-8 max-w-2xl text-xl md:text-2xl"
      >
        A Result-Oriented Web Developer building and managing Websites and Web Applications that
        leads to the success of the overall product
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto mb-8 max-w-2xl text-xl md:text-2xl"
      >
        <Button
          size="lg"
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => scrollTo("projects")}
        >
          SEE MORE
        </Button>
      </motion.div>
      <AnimatedDot />
    </section>
  );
};

export default Intro;
