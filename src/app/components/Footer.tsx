"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import ContactLinks from "./ContactLinks";

const Footer = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <footer className="mt-8 bg-gray-800 bg-opacity-90 text-gray-300 dark:bg-gray-900 dark:bg-opacity-90">
      <div className="container mx-auto px-10 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">Contact Me</h2>
            {formSubmitted ? (
              <p className="text-green-400">
                Thank you for your message! I&apos;ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="border-gray-600 bg-gray-700 text-white transition-all duration-300 focus:ring-2 focus:ring-primary"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="border-gray-600 bg-gray-700 text-white transition-all duration-300 focus:ring-2 focus:ring-primary"
                />
                <Textarea
                  placeholder="Your Message"
                  required
                  className="border-gray-600 bg-gray-700 text-white transition-all duration-300 focus:ring-2 focus:ring-primary"
                />
                <Button
                  type="submit"
                  className="bg-primary transition-all duration-300 hover:bg-primary/90"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">Connect With Me</h2>
            <div className="flex space-x-4">
              <ContactLinks />
            </div>
            <p className="mt-4 text-sm">
              © {new Date().getFullYear()} DevPortfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
