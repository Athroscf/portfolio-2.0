import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ActiveSectionProvider } from "./context-provider";
import ContactFloating from "./components/ContactFloating";

export const metadata: Metadata = {
  title: "Christopher Fiallos - Full Stack Developer Portfolio",
  description:
    "Christopher Fiallos is a Results-Oriented Full-Stack Developer specializing in building and managing software solutions and cloud-based applications that drive overall product success.",
  keywords: ["fullstack developer", "portfolio", "React", "Next.js", "AWS", "Christopher Fiallos"],
  authors: [{ name: "Christopher Fiallos" }],
  openGraph: {
    title: "Christopher Fiallos - Full Stack Developer Portfolio",
    description:
      "Christopher Fiallos is a Results-Oriented Full-Stack Developer specializing in building and managing software solutions and cloud-based applications that drive overall product success.",
    url: "https://www.christopher-fiallos.com",
    siteName: "Christopher Fiallos Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Fiallos - Full Stack Developer Portfolio",
    description:
      "Christopher Fiallos is a Results-Oriented Full-Stack Developer specializing in building and managing software solutions and cloud-based applications that drive overall product success.",
    images: [],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <head>
        <link rel="canonical" href="https://christopher-fiallos.com" />
      </head>
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
