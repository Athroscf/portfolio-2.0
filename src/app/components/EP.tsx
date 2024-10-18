import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "../theme-provider";

interface IEP {
  index: number;
  title: string;
  image?: string;
  description: string;
  technologies: string[];
  company?: string;
  period?: string;
}

const EP: React.FC<IEP> = ({ index, title, image, description, technologies, company, period }) => {
  const { theme } = useTheme();

  // Have to compress and optimize image resolution and size
  // search for sharp, react-optimized-image or compress-image packages.
  return (
    <div key={index} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} flex flex-col items-center gap-8 py-6 md:flex-row rounded-lg overflow-hidden transition-colors duration-300`}>
      {image ? (
        <div className="w-full md:w-1/2" style={{ position: "relative", aspectRatio: "16/9" }}>
          <Image
            src={image}
            alt={title}
            className="h-auto w-full rounded-lg object-cover shadow-md"
            fill
          />
        </div>
      ) : null}
      <div className="w-full space-y-4 md:w-1/2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        {company ? (
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {company}  |  {period}
          </p>
        ) : null}
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{description}</p>
        {technologies.map((tech, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="transition-all duration-300 hover:scale-110 mr-1"
          >
            {tech}
          </Badge>
        ))}
        <div>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">CASE STUDY</Button>
        </div>
      </div>
    </div>
  );
};

export default EP;
