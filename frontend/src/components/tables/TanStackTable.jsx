import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

import { BiSortDown, BiSortUp } from 'react-icons/bi';

const TanStackTable = ({ data, columns }) => {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
            columnFilters,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 5,
            },
        },
    });

    return (
        <div className="space-y-4 p-1 font-sans text-slate-800">
            {/* GLOBAL SEARCH & PAGE SIZE */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="border border-slate-300 focus:border-gray-400 rounded-md px-3 py-1.5 w-full sm:max-w-xs transition text-sm  outline-none focus:ring-2 focus:ring-indigo-200"
                />

                <div className="flex items-center gap-2 text-sm text-slate-600 self-end sm:self-auto">
                    <span>Show</span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="border border-slate-300 focus:border-black rounded-md px-2 py-1.5 bg-white outline-none cursor-pointer text-sm"
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <span>entries</span>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto border border-slate-300 rounded-md shadow-sm">
                <table className="w-full border-collapse text-sm">
                    {/* BLACK HEADER WITH SEPARATION LINES */}
                    <thead className="bg-black text-white select-none">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="px-4 py-3 text-left font-semibold uppercase tracking-wider text-xs border-r border-slate-800 last:border-r-0 cursor-pointer hover:bg-slate-900 transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </span>
                                            <span className="text-slate-200 font-mono text-sm w-4 text-right">
                                                {{
                                                    asc: <BiSortUp />,
                                                    desc: <BiSortDown />,
                                                }[header.column.getIsSorted()] ?? ""}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {/* BODY WITH SUBTLE LINES */}
                    <tbody className="divide-y divide-slate-200">
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-4 py-2.5 border-r border-slate-200 last:border-r-0 text-slate-700"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
                <div>
                    Showing page <span className="font-semibold text-slate-900">{table.getState().pagination.pageIndex + 1}</span> of{" "}
                    <span className="font-semibold text-slate-900">{table.getPageCount()}</span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="border border-slate-300 hover:border-black hover:bg-black hover:text-white px-3 py-1.5 rounded-md transition font-medium disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-slate-300 disabled:cursor-not-allowed"
                    >
                        First
                    </button>

                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="border border-slate-300 hover:border-black hover:bg-black hover:text-white px-3 py-1.5 rounded-md transition font-medium disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-slate-300 disabled:cursor-not-allowed"
                    >
                        Prev
                    </button>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="border border-slate-300 hover:border-black hover:bg-black hover:text-white px-3 py-1.5 rounded-md transition font-medium disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-slate-300 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>

                    <button
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                        className="border border-slate-300 hover:border-black hover:bg-black hover:text-white px-3 py-1.5 rounded-md transition font-medium disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-slate-300 disabled:cursor-not-allowed"
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TanStackTable;
