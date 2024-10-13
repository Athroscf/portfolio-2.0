import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center text-gray-800 dark:text-white">
      <h1 className="animate-fade-in-down mb-4 text-5xl font-bold md:text-7xl">
        Christopher Fiallos
      </h1>
      <h2 className="animate-fade-in-down mb-4 text-3xl font-bold md:text-5xl">
        Fullstack Developer
      </h2>
      <p className="animate-fade-in-up mb-8 max-w-2xl text-xl md:text-2xl">
        Welcome to my portfolio. I&apos;m a fullstack developer passionate about creating efficient
        and user-friendly web applications.
      </p>
      <Button size="lg" className="animate-fade-in">
        LEARN MORE
      </Button>
    </div>
  );
}
