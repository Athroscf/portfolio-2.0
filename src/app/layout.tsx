import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({
  children,
  backgroundImage,
}: Readonly<{
  children: React.ReactNode;
  backgroundImage: string;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div
            className="flex min-h-screen flex-col transition-colors duration-300 dark:bg-gray-900"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
