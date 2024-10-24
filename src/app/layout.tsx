import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ActiveSectionProvider } from "./context-provider";
import ContactFloating from "./components/ContactFloating";

export const metadata: Metadata = {
  title: "Christopher Fiallos Porftolio",
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-800 dark:bg-opacity-90`}
      >
        <ThemeProvider>
          <ActiveSectionProvider>
            <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-800 dark:bg-opacity-90">
              <Header />
              <ContactFloating />
              {children}
              <Footer />
            </div>
          </ActiveSectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
