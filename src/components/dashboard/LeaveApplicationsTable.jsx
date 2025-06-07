import * as React from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLeaveApplications } from "@/api/leaveApi";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const columns = [
  { accessorKey: "employee_id", header: "Employee ID" },
  { accessorKey: "employee_name", header: "Employee Name" },
  { accessorKey: "leave_type", header: "Leave Type" },
  { accessorKey: "start_date", header: "Start Date" },
  { accessorKey: "end_date", header: "End Date" },
  { accessorKey: "status", header: "Status" },
];

export function LeaveApplicationsTable() {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [employeeIdFilter, setEmployeeIdFilter] = React.useState("");
  const [startDateFilter, setStartDateFilter] = React.useState("");
  const [endDateFilter, setEndDateFilter] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      try {
        const applications = await getLeaveApplications();
        setData(applications || []);
      } catch (error) {
        console.error("Failed to fetch leave applications:", error);
        setData([]); // Set to empty array on error
      }
    }
    fetchData();
  }, []);

  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      const matchesEmployeeId = !employeeIdFilter || 
        String(row.employee_id).toLowerCase().includes(employeeIdFilter.toLowerCase());
      
      const matchesStartDate = !startDateFilter || 
        String(row.start_date).toLowerCase().includes(startDateFilter.toLowerCase());
      
      const matchesEndDate = !endDateFilter || 
        String(row.end_date).toLowerCase().includes(endDateFilter.toLowerCase());
      
      return matchesEmployeeId && matchesStartDate && matchesEndDate;
    });
  }, [data, employeeIdFilter, startDateFilter, endDateFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 py-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Employee ID</label>
          <Input
            placeholder="Search by ID..."
            value={employeeIdFilter}
            onChange={(event) => setEmployeeIdFilter(event.target.value)}
            className="w-[200px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Start Date</label>
          <Input
            placeholder="Search by start date..."
            value={startDateFilter}
            onChange={(event) => setStartDateFilter(event.target.value)}
            className="w-[200px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">End Date</label>
          <Input
            placeholder="Search by end date..."
            value={endDateFilter}
            onChange={(event) => setEndDateFilter(event.target.value)}
            className="w-[200px]"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer">
                    <div className="flex items-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" && <ArrowUpIcon className="ml-2 h-4 w-4" />}
                      {header.column.getIsSorted() === "desc" && <ArrowDownIcon className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
} 