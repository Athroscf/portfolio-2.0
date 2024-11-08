import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useActiveSection } from "../context-provider";
import { useTheme } from "../theme-provider";
import BouncingArrow from "@/app/components/BouncingArrow";
import { useEffect } from "react";

const Intro = () => {
  const { scrollTo } = useActiveSection();
  const { theme } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    });
  }, [controls]);

  return (
    <section id="home" className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${theme === "dark" ? "/imgs/dark-background.jpg" : "/imgs/light-background.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <motion.div
        className="container z-0 mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Hello, I&apos;m Christopher Fiallos
          </h1>
        </div>
        <p className="mx-auto mb-8 max-w-2xl text-xl md:text-2xl">
          Results-Oriented Full-Stack Developer specializing in building and managing software
          solutions and cloud-based applications that drive overall product success.
        </p>
        <div className="mx-auto mb-8 max-w-2xl text-xl md:text-2xl">
          <Button
            size="lg"
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => scrollTo("projects")}
          >
            SEE MORE
          </Button>
        </div>
      </motion.div>
      <BouncingArrow />
    </section>
  );
};

export default Intro;
