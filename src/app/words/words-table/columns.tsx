import { ColumnDef } from "@tanstack/react-table";

export type WordColumn = {
  name: string;
  translation: string;
  level: string;
};

export const columns: ColumnDef<WordColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "translation",
    header: "Translation",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
];
