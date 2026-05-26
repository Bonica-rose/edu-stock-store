import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProductTable from "../../components/ProductTable";

const InventoryPage = () => {
    const { products } = useSelector(
        (state) => state.inventory
    );

    return (
        <div className="space-y-6">
            {/* HEADER */}
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
                            bg-green-600 hover:bg-green-700
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

            {/* PRODUCTS */}
            <div className="bg-white rounded-xl border border-slate-200 p-3">
                <ProductTable
                    products={products.filter(
                        (item) =>
                            item.type === "product"
                    )}
                />
            </div>
        </div>
    );
};

export default InventoryPage;