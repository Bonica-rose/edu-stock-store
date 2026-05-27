import { getStorage,} from "../../../utils/storage";
import { STORAGE_KEYS, } from "../../../constants/storageKeys";
import mockBranches from "../../../mock/branches.json"

export const dashboardAPI = async () => {
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const branches = getStorage(STORAGE_KEYS.BRANCHES) || mockBranches;    
    const assetHistory = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

    // Filter metrics
    const totalProducts =
        products.filter(item => item.type === "product").length;
    const totalAssets =
        products.filter(item => item.type === "asset").length;
    const lowStockCount =
        products.filter(item => item.type === "product" && item.quantity <= 5).length;
    const assignedAssets =
        assetHistory.filter(item => item.action_type === "assigned").length;
    const availableAssets =
        products.filter(item => item.type === "asset" && item.status === "active").length;
    
    console.log(availableAssets);
    

    return {
        stats: {
            total_products: totalProducts,
            total_assets: totalAssets,
            low_stock_count: lowStockCount,
            total_branches: branches.length,
        },
        inventory_overview: [
            { name: "In Stock", value: products.filter(item => item.quantity > 5).length },
            { name: "Low Stock", value: lowStockCount },
            { name: "Out Of Stock", value: products.filter(item => item.quantity === 0).length },
        ],
        asset_status_overview: [
            { name: "Assigned", value: assignedAssets },
            { name: "Available", value: availableAssets },
        ],
    };
};


