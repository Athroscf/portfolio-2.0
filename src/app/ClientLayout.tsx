"use client";

import Loader from "./components/Loader";
import { Suspense, useEffect, useState } from "react";
import ContactFloating from "./components/ContactFloating";
import Footer from "./components/Footer";
import Header from "./components/Header";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Adjust timeout as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />; // Full-screen loader for initial loading
  }

  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-800 dark:bg-opacity-90">
        {children}
      </div>
      <ContactFloating />
      <Footer />
    </Suspense>
  );
};

export default ClientLayout;
