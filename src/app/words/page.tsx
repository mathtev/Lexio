import { Level } from "@prisma/client";
import Link from "next/link";
import { Card } from "~/components/ui/card";

interface Word {
  id: number;
  name: string;
  translation: string;
  langFrom: string;
  langTo: string;
  level: string;
}

// prettier-ignore
export const wordsList: Word[] = [
  { id: 1, name: "run", translation: "laufen", langFrom: "en", langTo: "de", level: "a1" },
  { id: 2, name: "cat", translation: "Katze", langFrom: "en", langTo: "de", level: "a1" },
  { id: 3, name: "house", translation: "Haus", langFrom: "en", langTo: "de", level: "a1" },
  { id: 4, name: "eat", translation: "essen", langFrom: "en", langTo: "de", level: "a1" },
  { id: 5, name: "book", translation: "Buch", langFrom: "en", langTo: "de", level: "a2" },
  { id: 6, name: "write", translation: "schreiben", langFrom: "en", langTo: "de", level: "a2" },
  { id: 7, name: "dog", translation: "Hund", langFrom: "en", langTo: "de", level: "a2" },
  { id: 8, name: "drink", translation: "trinken", langFrom: "en", langTo: "de", level: "a2" },
  { id: 9, name: "car", translation: "Auto", langFrom: "en", langTo: "de", level: "b1" },
  { id: 10, name: "read", translation: "lesen", langFrom: "en", langTo: "de", level: "b1" },
  { id: 11, name: "tree", translation: "Baum", langFrom: "en", langTo: "de", level: "b1" },
  { id: 12, name: "speak", translation: "sprechen", langFrom: "en", langTo: "de", level: "b1" },
  { id: 13, name: "computer", translation: "Computer", langFrom: "en", langTo: "de", level: "b2" },
  { id: 14, name: "swim", translation: "schwimmen", langFrom: "en", langTo: "de", level: "b2" },
  { id: 15, name: "phone", translation: "Telefon", langFrom: "en", langTo: "de", level: "b2" },
  { id: 16, name: "drive", translation: "fahren", langFrom: "en", langTo: "de", level: "b2" },
  { id: 17, name: "university", translation: "Universität", langFrom: "en", langTo: "de", level: "c1" },
  { id: 18, name: "teach", translation: "lehren", langFrom: "en", langTo: "de", level: "c1" },
  { id: 19, name: "hospital", translation: "Krankenhaus", langFrom: "en", langTo: "de", level: "c1" },
  { id: 20, name: "learn", translation: "lernen", langFrom: "en", langTo: "de", level: "c1" },
  { id: 21, name: "government", translation: "Regierung", langFrom: "en", langTo: "de", level: "c2" },
  { id: 22, name: "analyze", translation: "analysieren", langFrom: "en", langTo: "de", level: "c2" },
  { id: 23, name: "philosophy", translation: "Philosophie", langFrom: "en", langTo: "de", level: "c2" },
  { id: 24, name: "negotiate", translation: "verhandeln", langFrom: "en", langTo: "de", level: "c2" }
];

export default function Words() {
  const levels = Object.values(Level);
  return (
    <PageContainer className="grid grid-cols-3 grid-rows-2 gap-12 bg-blue-200 p-12">
      {levels.map((level) => (
        <StudySetCard key={level} level={level} />
      ))}
    </PageContainer>
  );
}

const StudySetCard = ({ level }: { level: string }) => {
  return (
    <Link href={`/words/${level.toUpperCase()}`} className="h-full">
      <Card className="flex h-full cursor-pointer items-center justify-center border border-black transition-colors duration-100 hover:bg-blue-300">
        <div className="text-2xl font-bold">{level}</div>
      </Card>
    </Link>
  );
};

export const PageContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return <div className={`absolute inset-0 ${className}`}>{children}</div>;
};
