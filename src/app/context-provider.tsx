"use client";

import { createContext, useContext, useState } from "react";

interface IActiveSectionContext {
  activeSection: string;
  // eslint-disable-next-line no-unused-vars
  setActiveSection: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  scrollTo: (id: string) => void;
}

const ActiveSectionContext = createContext<IActiveSectionContext | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, scrollTo }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);

  if (!context) throw new Error("useActiveSection must be used within an ActiveSectionProvider");

  return context;
};
