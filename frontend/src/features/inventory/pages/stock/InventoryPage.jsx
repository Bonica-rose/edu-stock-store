import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import TanStackTable from "../../../../components/tables/TanStackTable";
import { stockMovementColumns } from "../../components/StockMovementColumns";
import { fetchStockMovementsThunk } from "../../stockThunk";
import { fetchProductsThunk } from "../../inventoryThunk";


const InventoryPage = () => {
    const dispatch = useDispatch();
    const { products, stockMovements } = useSelector((state) => state.inventory);    
    
    useEffect(() => {
        dispatch(fetchStockMovementsThunk());
        dispatch(fetchProductsThunk())
    }, [dispatch]);

    useEffect(() => {
        console.log(stockMovements);
        console.log(products); 
    }, [stockMovements, products]);
    
    const columns = useMemo(
        () => stockMovementColumns(products),
        [products]
    );

    return (
        <div className="space-y-6">
            {/* HEADING */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Inventory
                    </h1>

                    <p className="text-sm text-slate-500">
                        Manage stock quantities and movements
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/edu/inventory/stock-in"
                        className="
                            inline-flex items-center gap-2
                            bg-lime-700 hover:bg-lime-800
                            text-white px-4 py-2 rounded-lg
                        "
                    >
                        <FaArrowDown />
                        Stock In
                    </Link>

                    <Link
                        to="/edu/inventory/stock-out"
                        className="
                            inline-flex items-center gap-2
                            bg-red-600 hover:bg-red-700
                            text-white px-4 py-2 rounded-lg
                        "
                    >
                        <FaArrowUp />
                        Stock Out
                    </Link>
                </div>
            </div>

            {/* INVENTORY  */}
            <div className="bg-white rounded-xl border border-slate-200 p-3">
                <TanStackTable
                    data={stockMovements}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default InventoryPage;