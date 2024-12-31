"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: {
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    total: number;
  };
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  className,
}: DataTableProps<TData, TValue>) {
  const hasMore = pagination
    ? pagination.total > pagination.pageSize * pagination.currentPage
    : false;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: pagination?.total ?? 0,
    state: {
      pagination: {
        pageIndex: pagination?.currentPage ? pagination.currentPage - 1 : 0,
        pageSize: pagination?.pageSize ?? 0,
      },
    },
  });

  return (
    <div className={`flex h-full min-h-0 flex-col ${className}`}>
      <div className="h-full overflow-y-auto rounded-md border [&>div]:h-full">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="sticky">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="sticky top-0"
                      style={{
                        borderLeft: "1px dotted rgba(200, 209, 224, 0.6)",
                        borderBottom: "1px solid #e8e8e8",
                        background: "#fff",
                        textAlign: "left",
                        zIndex: 99999,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            disabled={!hasMore}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
