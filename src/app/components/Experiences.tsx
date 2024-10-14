import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { experiences } from "@/lib/content";

const Experience = () => {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Work Experience</h2>
      <div className="space-y-6">
        {experiences.map((item, index) => (
          <Card
            key={`${index}-${item.title}`}
            className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-700"
          >
            <CardHeader>
              <CardTitle className="text-primary">{item.title}</CardTitle>
              <CardDescription className="dark:text-gray-300">
                {item.company} | {item.period}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 dark:text-gray-300">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, i) => (
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
        ))}
      </div>
    </section>
  );
};

export default Experience;
