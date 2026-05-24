import { useMemo } from "react";
import { assetTableColumns } from "./AssetTableColumns";

const AssetTable = ({ assets = [], updateAssetStatus, onDelete, permissions }) => {
    // Generate column configurations dynamically mapping callback dependencies
    const columns = useMemo(
        () => assetTableColumns(updateAssetStatus, onDelete, permissions),
        [updateAssetStatus, onDelete, permissions]
    );

    if (!assets.length) {
        return (
            <div className="text-center py-12 bg-white border rounded-xl shadow-sm border-gray-100">
                <p className="text-gray-400 font-medium text-sm">No assets found in inventory.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse font-sans text-slate-800 text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-gray-200">
                        {columns.map((col, index) => (
                            <th 
                                key={col.id || col.accessorKey || index} 
                                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {assets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-slate-50/50 transition-colors">
                            {columns.map((col, index) => {
                                // Extract row render configurations dynamically
                                let cellContent;
                                if (col.cell) {
                                    cellContent = col.cell({
                                        row: { original: asset },
                                        getValue: () => col.accessorFn ? col.accessorFn(asset) : asset[col.accessorKey]
                                    });
                                } else if (col.accessorFn) {
                                    cellContent = col.accessorFn(asset);
                                } else {
                                    cellContent = asset[col.accessorKey];
                                }

                                return (
                                    <td key={col.id || col.accessorKey || index} className="px-6 py-4 whitespace-nowrap text-slate-700 font-normal">
                                        {cellContent ?? "-"}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetTable;
