"use client";

import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 text-gray-800 shadow-lg transition-all duration-300 dark:bg-gray-800 dark:bg-opacity-90 dark:text-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold transition-transform hover:scale-105">
            DevPortfolio
          </Link>
          <div className="flex items-center space-x-4">
            <ul className="hidden space-x-4 md:flex">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/experience" className="transition-colors hover:text-primary">
                  Experience
                </Link>
                <Link href="/skills" className="transition-colors hover:text-primary">
                  Skills
                </Link>
              </li>
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
          <ul className="mt-4 space-y-2 md:hidden">
            <li>
              <Link href="/" className="block py-2 transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/experience" className="block py-2 transition-colors hover:text-primary">
                Experience & Projects
              </Link>
            </li>
            <li>
              <Link href="/skills" className="block py-2 transition-colors hover:text-primary">
                Skills
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
