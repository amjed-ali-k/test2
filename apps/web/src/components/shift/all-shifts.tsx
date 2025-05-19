import  { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { format, startOfMonth } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { type EdenType, useEden } from "@/lib/api";
import { Link } from "react-router";
import { ShiftStatusBadge } from "@repo/ui/custom/badge";
import { OrganizationName, SubBlockName } from "../org/org-comp";
import { DataTableColumnHeader } from "@repo/ui/components/column-header";
import { DataTable } from "@repo/ui/components/data-table";

const fetcher = (eden: EdenType ) => () => eden.user.shift.all.get({
    query: {
        from: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    }
}).then(e => e.data)

type ShiftType = Awaited<ReturnType<ReturnType<typeof fetcher>>>[number]

function AllshiftsComponent() {
    const eden = useEden()
  const {
    data: shifts,
    isLoading,
  } = useQuery({
    queryKey: ["shifts"],
    queryFn: fetcher(eden),
  });

  const columns = useMemo<ColumnDef<ShiftType>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Shift ID" />
        ),
        meta: {
          cellClassName: "hidden lg:table-cell",
        },
        cell: (e) => (
          <div className=" pl-2 text-sm font-medium text-[#101828] ">
            SJ{e.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "organizationId",
        header: "Job Details",
        cell: (e) => (
          <div className=" text-sm font-semibold text-[#101828]">
            <OrganizationName
              id={e.getValue() as any}
              className=" font-medium text-[#101828] "
            />
            <p className="flex flex-col text-xs xl:hidden ">
              {format(e.row.original.start, "MMMM d, yyy")}
              <span className="text-[#475467] xl:hidden ">
                {e.row.original.type
                  ?.split("_")?.[0]
                  ?.toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            </p>
          </div>
        ),
      },
      {
        accessorKey: "organizationSubBlockId",
        meta: {
          cellClassName: "hidden lg:table-cell",
        },
        header: "Block",
        cell: (e) => (
          <SubBlockName
            id={e.row.original.organizationId}
            subBlockid={e.getValue() as any}
          />
        ),
      },
      {
        accessorKey: "start",

        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        meta: {
          cellClassName: "hidden xl:table-cell",
        },
        cell: (e) => (
          <p className="mr-4 whitespace-nowrap text-sm font-normal text-[#475467]">
            {format(e.getValue() as any, "MMM dd, yyyy")}
          </p>
        ),
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Shift Time" />
        ),
        meta: {
          cellClassName: "hidden xl:table-cell",
        },
        cell: (e) => (
          <div className="mr-8">
            <p className="text-sm font-normal text-[#101828]">
              {e.row.original.type
                .split("_")[0]
                ?.toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase())}
            </p>

            <p className=" whitespace-nowrap text-sm font-normal text-[#475467] ">
              {format(e.row.original.start, "p")} -{" "}
              {format(e.row.original.end, "p")}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "hourlyRate",
        meta: {
          cellClassName: "hidden lg:table-cell",
        },
        header: "Rate/Hr",
        cell: (e) => <p>${e.row.original.hourlyRate}.00</p>,
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: (e) => <ShiftStatusBadge status={e.row.original.status} />,
      },
      {
        accessorKey: "id",
        header: " ",
        cell: (e) => (
          <div className="flex space-x-2 duration-200">
            <Link
              className=" text-sm font-semibold text-primary-text hover:text-primary-text-lighter   "
              href={`/shift/${e.row.original.id}`}
            >
              View
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="mt-8">
      <DataTable
        filterPlaceholder="Search"
        filterField="postedById"
        columns={columns}
        data={shifts || []}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AllshiftsComponent;
