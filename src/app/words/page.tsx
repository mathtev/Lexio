import React from "react";
import { PageContainer } from "~/components/layout/pageContainer";
import { api, HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";
import { WordsTable } from "./words-table/wordsTable";
import { WordSchema } from "validators/word";

export default async function WordsList({}) {
  const session = await auth();

  const defaultOptions: Required<WordSchema> = {
    levels: [],
    search: "",
    limit: 25,
    start: 0,
  };

  if (session?.user) {
    void api.word.getWords.prefetch(defaultOptions);
  }

  return (
    <HydrateClient>
      <PageContainer className="h-h-full flex h-full justify-center">
        <WordsTable defaultOptions={defaultOptions} />
      </PageContainer>
    </HydrateClient>
  );
}
