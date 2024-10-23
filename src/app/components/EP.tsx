import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EPCard } from "../types";
import "../globals.css";
import DividerLine from "./DividerLine";

interface IEP {
  title: string;
  description: string;
  cards: EPCard[];
}

const EP: React.FC<IEP> = ({ title, description, cards }) => {
  return (
    <section id={title} className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-8 text-center text-3xl font-bold capitalize">{title}</h2>
        <DividerLine />
        <p className="mx-auto mb-12 max-w-2xl text-center">{description}</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((project, index) => {
            const totalItems = cards.length;

            return (
              <div
                key={index}
                className={`group flex h-[300px] justify-center`}
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`relative h-full w-[500px] transition-transform duration-700 ease-in-out ${
                    totalItems === 1 // Center single item
                      ? "justify-self-center" // Center the item
                      : totalItems === 2 // Center both items if there are 2
                        ? "col-span-2 justify-between"
                        : totalItems % 3 === 1 && index === totalItems - 1 // Center the last item if total items is odd
                          ? "col-span-3 justify-self-center" // Center the last single card in its own row
                          : "" // No additional classes needed for 3 items
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of the card */}
                  <div
                    className="absolute inset-0 h-full w-full"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Card className="flex h-full w-full flex-col items-center justify-center p-6">
                      <div className="mb-4 text-6xl">{project?.icon}</div>
                      <h3 className="text-center text-2xl font-semibold">{project.title}</h3>
                    </Card>
                  </div>

                  {/* Back of the card */}
                  <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <Card className="flex h-full w-full flex-col justify-between p-6">
                      <h3 className="mb-4 text-2xl font-semibold">{project.title}</h3>
                      <p className="flex-grow">{project.description}</p>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EP;
