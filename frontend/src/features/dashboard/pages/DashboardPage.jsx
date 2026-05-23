import { useSelector } from "react-redux";
import roles from "../../../mock/roles.json";

import StaffDashboard from "./StaffDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import BranchHeadDashboard from "./BranchHeadDashboard";
import InventoryManagerDashboard from './InventoryManagerDashboard';
import PurchaseManagerDashboard from './PurchaseManagerDashboard'
import AssetManagerDashboard from './AssetManagerDashboard'

const DashboardPage = () => {
    const { user } = useSelector((state) => state.auth);

    // Later must take redux state roles
    const loggedRoleName =
        roles.find(
            (role) => role.id === user.role_id
        );

    // console.log('loggedRole: ',loggedRoleName.name);
    
    if (loggedRoleName.name === "super_admin") {
        return <SuperAdminDashboard />;
    }

    if (loggedRoleName.name === "branch_head") {
        return <BranchHeadDashboard />;
    }

    if (loggedRoleName.name === "inventory_manager") {
        return <InventoryManagerDashboard />;
    }

    if (loggedRoleName.name === "asset_manager") {
        return <AssetManagerDashboard />;
    }

    if (loggedRoleName.name === "purchase_manager") {
        return <PurchaseManagerDashboard />;
    }

    return <StaffDashboard />;
}

export default DashboardPage