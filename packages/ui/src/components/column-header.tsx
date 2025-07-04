import type { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { Button } from "./button.js";
import { cn } from "../lib/utils.js";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="data-[state=open]:bg-accent -ml-3 h-8"
        onClick={() => column.toggleSorting()}
      >
        <span className=" text-[12px] font-medium">{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ChevronDown className="ml-2 size-4" />
        ) : column.getIsSorted() === "asc" ? (
          <ChevronUp className="ml-2 size-4" />
        ) : (
          <ChevronsUpDown className="ml-2 size-4" />
        )}
      </Button>
    </div>
  );
}
