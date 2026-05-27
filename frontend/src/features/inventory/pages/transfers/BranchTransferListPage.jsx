import { useEffect, useMemo } from "react";
import { useDispatch, useSelector,} from "react-redux";
import { Link } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";
import TanStackTable from "../../../../components/tables/TanStackTable";
import { branchTansferColumns } from "../../components/BranchTransferColumns";
import branches from "../../../../mock/branches.json";
import {
    fetchBranchTransfersThunk,
} from "../../transferThunk";
import {
    fetchProductsThunk,
} from "../../inventoryThunk";

const BranchTransferListPage = () => {
    const dispatch = useDispatch();

    const { branchTransfers, products } = useSelector((state) => state.inventory);

    useEffect(() => {
        dispatch(fetchBranchTransfersThunk());
        dispatch(fetchProductsThunk());
    }, [dispatch]);

    const columns = useMemo(
        () => branchTansferColumns({ products, branches }),
        [products,branches]
    );

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Branch Transfers
                    </h1>

                    <p className="text-sm text-slate-500">
                        Manage stock transfers between branches
                    </p>
                </div>

                <Link
                    to="/edu/transfers/create"
                    className="
                        inline-flex items-center gap-2
                        bg-indigo-600 hover:bg-indigo-700
                        text-white px-4 py-2 rounded-lg
                    "
                >
                    <FaExchangeAlt />

                    New Transfer
                </Link>

            </div>

            {/* TABLE */}
            <div
                className="
                    bg-white rounded-xl
                    border border-slate-200 p-3
                "
            >
                <TanStackTable
                    data={branchTransfers}
                    columns={columns}
                />
            </div>

        </div>
    );
};

export default BranchTransferListPage;