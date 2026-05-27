import { useEffect } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchDashboardThunk,
} from "../redux/dashboardThunk";

import DashboardStatCard
    from "../components/DashboardStatCard";

import InventoryOverviewChart
  from "../components/charts/InventoryOverviewChart";
    
import AssetStatusChart
  from "../components/charts/AssetStatusChart";  

const SuperAdminDashboard = () => {

    const dispatch = useDispatch();

    const {
        stats,
        inventoryOverview,
        assetStatusOverview,
    } = useSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(fetchDashboardThunk());
    }, [dispatch]);

    return (
        <div className="space-y-6">

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                "
            >
                <DashboardStatCard
                    title="Total Products"
                    value={stats.total_products}
                />

                <DashboardStatCard
                    title="Total Assets"
                    value={stats.total_assets}
                />

                <DashboardStatCard
                    title="Low Stock Count"
                    value={stats.low_stock_count}
                />

                <DashboardStatCard
                    title="Total Branches"
                    value={stats.total_branches}
                />
            </div>

            <InventoryOverviewChart
                data={inventoryOverview}
            />
            <AssetStatusChart
                data={assetStatusOverview}
            />
        </div>
    );
};

export default SuperAdminDashboard;