import * as React from "react";
import { type RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnSort,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowData,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { cn } from "../lib/utils.js";
import { Input } from "./input.js";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./table.js";
import { Button } from "./button.js";
import { Badge } from "./badge.js";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterField?: string;
  filterPlaceholder?: string;
  stripped?: boolean;
  isLoading?: boolean;
  url?: string;
  defaultSort?: ColumnSort;
  title?: string;
  count?: number;
  endComponent?: React.ReactNode;
  manualFiltering?: boolean;
}

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    cellClassName?: string;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  filterPlaceholder,
  isLoading,
  stripped = false,
  url,
  defaultSort,
  title,
  count,
  endComponent,
  manualFiltering = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(() =>
    defaultSort ? [defaultSort] : [],
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    manualFiltering,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  const navigate = useNavigate();
  const handleClick = () => {
    url && navigate(url);
  };
  return (
    <div>
      {filterPlaceholder && (
        <div className="mt-4 flex items-center space-x-1 lg:justify-between ">
          <DebouncedInput
            placeholder={filterPlaceholder}
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
          />
          {endComponent}

          {/* <Button variant="outline" className=" h-11">
            <Filter className="size-4" />
            <span className=" ml-2 hidden md:block">Filters</span>
          </Button> */}
        </div>
      )}
      <div className="mt-4 overflow-hidden rounded-xl border">
        {title && (
          <div className="flex items-center border-b px-6 py-5">
            <h2 className="mr-2 pb-0 text-lg font-medium text-[#101828]">
              {title}
            </h2>
            {count && count > 0 ? (
              <Badge size="sm" variant="primary">
                {count}
              </Badge>
            ) : (
              ""
            )}
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={header.column.columnDef.meta?.cellClassName}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : (flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          ) as any)}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-cy="job-card-select"
                  onClick={handleClick}
                  className={cn("group/row", {
                    "even:bg-slate-200/70": stripped,
                  })}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={cell.column.columnDef.meta?.cellClassName}
                      key={cell.id}
                    >
                      {
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        ) as any
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {(table.getCanPreviousPage() || table.getCanNextPage()) && (
          <>
            <div className="flex items-center justify-between space-x-2 border-t px-4 py-4 lg:hidden">
              <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                variant="outline"
                className="rounded-lg border p-1 "
              >
                <ArrowLeft size={36} color="#344054" className=" p-1" />
              </Button>

              <span className="text-sm font-medium text-[#344054] ">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>

              <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                variant="outline"
                className="rounded-lg border p-1 "
              >
                <ArrowRight size={36} color="#344054" className=" p-1" />
              </Button>
            </div>
            <div className="hidden items-center justify-between border-t px-4 py-4 lg:flex">
              <span className="text-sm font-medium text-[#344054] ">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              <div className="flex space-x-2 ">
                <Button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  variant="outline"
                  className=" font-semibold"
                >
                  Previous
                </Button>

                <Button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  variant="outline"
                  className=" font-semibold "
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative w-full lg:max-w-[400px]">
      <div className="absolute inset-y-0 flex items-center">
        <Search className="text-body-base mx-3 h-5 w-5" />
      </div>
      <div>
        <Input
          {...props}
          value={value}
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
          className="pl-10 "
        />
      </div>
    </div>
  );
}
