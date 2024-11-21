/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { useMemo, useState } from "react";
import { MdContentCopy, MdDone } from "react-icons/md";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setPagination: OnChangeFn<PaginationState>;
  pagination: PaginationState;
  total: number;
  setSorting: OnChangeFn<SortingState>;
  sorting: SortingState;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setFetchDataOptions: React.Dispatch<React.SetStateAction<any>>;
  fetchDataOptions: any;
}

function DataTable<TData, TValue>({
  columns,
  data,
  setPagination,
  pagination,
  total,
  setSorting,
  sorting,
  setColumnFilters,
  columnFilters,
  columnVisibility,
  setColumnVisibility,
  setFetchDataOptions,
}: DataTableProps<TData, TValue>) {
  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    manualPagination: true,
    pageCount: Math.ceil(total / pagination.pageSize),
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: (updater) => {
      setSorting(updater);
      const sortingState =
        typeof updater === "function" ? updater(sorting) : updater;
      if (sortingState.length > 0) {
        const sort = sortingState[0];
        setFetchDataOptions((prev: any) => ({
          ...prev,
          sortCol: sort.id,
          sortOrder: sort.desc ? "desc" : "asc",
        }));
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  const [copiedText, setCopiedText] = useState<{
    index: number;
    copied: boolean;
  }>({
    index: -1,
    copied: false,
  });

  function handleCopyClick(index: number, value: any) {
    const copyValue = typeof value === "string" ? value : `${value}`;
    navigator.clipboard.writeText(copyValue);
    setCopiedText({ index, copied: true });
    setTimeout(() => {
      setCopiedText({ index: -1, copied: false });
    }, 1500);
  }

  return (
    <div className="h-auto pt-5 w-full">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full mx-5">
          <div className="w-full justify-end flex mb-2">
            <nav className="inline-flex  items-center p-1 rounded space-x-2 mt-4 ">
              <button
                className="p-1 rounded border text-black bg-white hover:text-white hover:bg-gray-600 hover:border-gray-600"
                onClick={() =>
                  setPagination({
                    pageIndex: pagination.pageIndex - 1,
                    pageSize: pagination.pageSize,
                  })
                }
                disabled={pagination.pageIndex <= 0}
              >
                <ArrowBigLeftDash />
              </button>
              <p className="text-gray-500">
                Page {pagination.pageIndex + 1} of{" "}
                {Math.ceil(total / pagination.pageSize)}
              </p>
              <button
                className="p-1 rounded border text-black hover:text-white hover:bg-gray-600 hover:border-gray-600"
                onClick={() =>
                  setPagination({
                    pageIndex: pagination.pageIndex + 1,
                    pageSize: pagination.pageSize,
                  })
                }
                disabled={
                  pagination.pageIndex >=
                  Math.ceil(total / pagination.pageSize) - 1
                }
              >
                <ArrowBigRightDash />
              </button>
            </nav>
          </div>
          <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
            <div className="w-full">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="w-full text-xs text-gray-700 uppercase bg-gray-200 ">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th scope="col" key={header.id} className="px-6 py-3">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row, index) => (
                      <tr
                        key={row.id}
                        className="bg-white border-b border-gray-700 hover:bg-gray-50 "
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-6 py-4">
                            <div className="flex gap-[0.4rem] items-center">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                              {(cell.column.columnDef.meta as any)?.copy && (
                                <div className="-mt-[0.2rem]">
                                  {copiedText.copied &&
                                  copiedText.index === index ? (
                                    <MdDone className="mt-1 h-[1rem] text-primary" />
                                  ) : (
                                    <MdContentCopy
                                      className="mt-1 h-[1rem] cursor-pointer text-white"
                                      onClick={() =>
                                        handleCopyClick(index, cell?.getValue())
                                      }
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
