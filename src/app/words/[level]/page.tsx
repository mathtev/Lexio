import React from "react";
import { PageContainer, wordsList } from "../page";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "~/components/ui/table";

export default function WordsList({ params }: { params: { level: string } }) {
  const words = wordsList.filter((word) => word.level === params.level);
  return (
    <PageContainer className="flex justify-center p-8">
      <div className="w-4/5">
        <h1 className="font-bold">List title</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Translation</TableHead>
              <TableHead className="font-bold">Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {words.map((word) => (
              <WordsListRow key={word.id} word={word} />
            ))}
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
}

const WordsListRow = ({ word }: { word: (typeof wordsList)[0] }) => {
  return (
    <TableRow>
      <TableCell>{word.name}</TableCell>
      <TableCell>{word.translation}</TableCell>
      <TableCell>{word.level}</TableCell>
    </TableRow>
  );
};
