"use client";

import { motion } from "framer-motion";

interface ILoader {
  text?: string;
  footerText?: string;
}

const Loader: React.FC<ILoader> = ({
  text = "Loading...",
  footerText = "Created and developed by Christopher Fiallos © 2024",
}) => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <div
      key="loader"
      className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-background"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Custom spinner */}
        <motion.div variants={spinnerVariants} animate="animate" className="relative h-12 w-12">
          <svg
            className="absolute inset-0 h-full w-full text-muted-foreground/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path d="M12 2C6.47715 2 2 6.47715 2 12" />
          </svg>
        </motion.div>

        {/* Loading text */}
        <motion.p
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-base text-muted-foreground/70"
        >
          {text}
        </motion.p>
      </div>

      {/* Footer text */}
      <motion.p
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-8 text-sm text-muted-foreground/50"
      >
        {footerText}
      </motion.p>
    </div>
  );
};

export default Loader;
