import { useNavigate } from "react-router";
import Button from "../../ui/button/Button";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

export interface ColumnConfig<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T extends { [key: string]: any }> {
  data: T[];
  columns: ColumnConfig<T>[];
  createLink?: string;
}

export default function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  createLink,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // default 5 rows per page
  const navigate = useNavigate();
  // Handle sort
  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Filter, Sort, Paginate
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);


  return (
    <div className="space-y-4">
      <div className="flex">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-[30%] px-4 py-2 rounded-xl border border-gray-200 bg-white dark:text-white/90 dark:border-white/[0.05] dark:bg-white/[0.03]"
        />
        {/* Rows Per Page */}
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1); // reset ke halaman pertama
          }}
          className="appearance-none cursor-pointer w-[20%] ml-4 px-4 py-2 rounded-xl border border-gray-200 bg-white dark:text-white/90 dark:border-white/[0.05] dark:bg-white/[0.03]"
        >
          {[5, 10, 20, 50].map((num) => (
            <option 
            key={num} value={num}>
              {num} / halaman
            </option>
          ))}
        </select>
        {createLink && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(createLink)}
            className="ml-auto cursor-pointer"
          >
            Tambah Data
          </Button>
        )}
      </div>
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    isHeader
                    onClick={() => handleSort(col.accessor)}
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-300 cursor-pointer hover:underline"
                  >
                    {col.header}
                    {sortColumn === col.accessor &&
                      (sortDirection === "asc" ? " ↑" : " ↓")}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-5 py-4 text-start dark:text-white/90"
                    >
                      {col.render
                        ? col.render(row[col.accessor], row, rowIndex)
                        : String(row[col.accessor])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex w-max ml-auto items-center justify-between">
        <Button
           size="sm"
          variant="primary"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          Prev
        </Button>

        <span className="mx-5 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
