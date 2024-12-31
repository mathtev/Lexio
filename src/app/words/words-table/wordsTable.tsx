"use client";

import React, { useState } from "react";
import { WordSchema } from "validators/word";
import { DataTable } from "~/components/shared/data-table/dataTable";
import { api } from "~/trpc/react";
import { columns } from "./columns";
import { TableFilters } from "./filters";

export type WordsTableFilters = {
  name: string;
  levels: string[];
};

export const WordsTable: React.FC<{ defaultOptions: Required<WordSchema> }> = ({
  defaultOptions,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<WordsTableFilters>({
    name: defaultOptions.search,
    levels: defaultOptions.levels,
  });

  const { data } = api.word.getWords.useQuery({
    start: (currentPage - 1) * defaultOptions.limit,
    limit: defaultOptions.limit,
    search: filters.name,
    levels: filters.levels,
  });

  const onFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex h-full flex-col">
      <TableFilters filters={filters} onChange={onFilterChange} />
      <h1 className="font-bold">List title</h1>
      <DataTable
        columns={columns}
        data={data?.words ?? []}
        className="flex-shrink"
        pagination={{
          currentPage,
          pageSize: defaultOptions.limit,
          total: data?.total ?? 0,
          onPageChange: onPageChange,
        }}
      />
    </div>
  );
};
