import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IEP {
  title: string;
  description: string;
  technologies: string[];
  company?: string;
  period?: string;
}

const EP: React.FC<IEP> = ({ title, description, technologies, company, period }) => {
  return (
    <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-700">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
        {period ? (
          <CardDescription className="dark:text-gray-300">
            {company} | {period}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent>
        <p className="mb-4 dark:text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="transition-all duration-300 hover:scale-110"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EP;
