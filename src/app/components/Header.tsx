"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useActiveSection } from "../context-provider";
import { useTheme } from "../theme-provider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();
  const { activeSection, scrollTo } = useActiveSection();
  const { theme } = useTheme();

  const sections = ["home", "about", "work", "projects"];

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 text-gray-800 shadow-lg transition-all duration-300 dark:bg-gray-800 dark:bg-opacity-90 dark:text-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10" style={{ position: "relative", aspectRatio: "16/9" }}>
              <Image
                src="/profile.png"
                alt="Christopher Fiallos"
                className="h-10 w-10 rounded-full"
                fill
              />
            </div>
            <span className="text-xl font-bold">CHRISTOPHER FIALLOS</span>
          </div>
          <div className="flex items-center space-x-4">
            <ul className="hidden space-x-4 md:flex">
              {sections.map((section, index) => (
                <button
                  key={`${index}-{section}`}
                  onClick={() => scrollTo(section)}
                  className={`capitalize ${activeSection === section ? "text-purple-600" : theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors hover:text-purple-600`}
                >
                  {section}
                </button>
              ))}
            </ul>
            <ThemeToggle />
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </Button>
            </div>
          </div>
        </nav>
        {isMenuOpen && (
          <ul className="mt-4 space-y-2 text-center md:hidden">
            {sections.map((section, index) => (
              <li key={`${index}-{section}`}>
                <button
                  onClick={() => scrollTo(section)}
                  className={`capitalize ${activeSection === section ? "text-purple-600" : theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors hover:text-purple-600`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
