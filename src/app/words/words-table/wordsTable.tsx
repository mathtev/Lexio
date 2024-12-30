"use client";

import React, { useState } from "react";
import { WordSchema } from "validators/word";
import { DataTable } from "~/components/shared/data-table/dataTable";
import { api } from "~/trpc/react";
import { columns } from "./columns";
import { TableFilters } from "./filters";

export const WordsTable: React.FC<{ defaultOptions: WordSchema }> = ({
  defaultOptions,
}) => {
  const [filters, setFilters] = useState(defaultOptions);

  const { data } = api.word.getWords.useQuery(filters);

  const onFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex h-full flex-col">
      <TableFilters filters={filters} onChange={onFilterChange} />
      <h1 className="font-bold">List title</h1>
      <DataTable
        columns={columns}
        data={data?.words ?? []}
        className="flex-shrink"
      />
    </div>
  );
};
