import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { stockMovementColumns } from "./StockMovementColumns";

const StockMovementTable = ({
    data = [],
}) => {
    const table = useReactTable({
        data,
        columns: stockMovementColumns,
        getCoreRowModel:
            getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-slate-100">
                    {table
                        .getHeaderGroups()
                        .map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map(
                                    (header) => (
                                        <th
                                            key={
                                                header.id
                                            }
                                            className="
                                                px-4 py-3 text-left
                                                text-sm font-semibold
                                            "
                                        >
                                            {flexRender(
                                                header
                                                    .column
                                                    .columnDef
                                                    .header,
                                                header.getContext()
                                            )}
                                        </th>
                                    )
                                )}
                            </tr>
                        ))}
                </thead>

                <tbody>
                    {table
                        .getRowModel()
                        .rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b"
                            >
                                {row
                                    .getVisibleCells()
                                    .map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="
                                                px-4 py-3 text-sm
                                            "
                                        >
                                            {flexRender(
                                                cell
                                                    .column
                                                    .columnDef
                                                    .cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockMovementTable;