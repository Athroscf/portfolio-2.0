export type EPCard = {
  title: string;
  company?: string;
  period?: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  technologies: string[];
};

export type EPSection = {
  sectionTitle: string;
  sectionDescription: string;
  cards: EPCard[];
};

export type Skill = {
  name: string;
  level: number;
  color: string;
};
