import { getStorage, setStorage } from "../../../utils/storage";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import generateId from "../../../utils/generateId";

const fakeDelay = (ms = 500) =>
    new Promise((res) => setTimeout(res, ms));

/* GET ASSET HISTORY */
export const getAssetHistoryAPI = async (asset_id) => {
    await fakeDelay();
    const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];
    return history.filter((item) => String(item.asset_id) === String(asset_id));
};

// ASSIGN ASSET TO USER
export const assignAssetAPI = async (data) => {
    await fakeDelay();
    const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];

    // FIND ASSET
    const asset = products.find((p) => String(p.id) === String(data.asset_id));
    if (!asset) {
        throw new Error("Asset not found");
    }
    // VALIDATE CURRENT STATUS
    if (asset.asset_status !== "active") {
        throw new Error(`Cannot assign asset while status is "${asset.asset_status}"`);
    }

    const newEntry = {
        id: generateId(),
        asset_id: data.asset_id,
        action_type: "assigned",
        from_user_id: null,
        to_user_id: data.to_user_id,
        from_branch_id: data.from_branch_id,
        to_branch_id: data.to_branch_id,
        notes: data.notes || "",
        created_at: new Date().toISOString(),
    };

    const updatedHistory = [...history, newEntry];
    setStorage(STORAGE_KEYS.ASSET_HISTORY, updatedHistory);

    // update asset status
    const updatedProducts = products.map((p) =>
        String(p.id) === String(data.asset_id)
            ? { ...p, asset_status: "active" }
            : p
    );

    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);

    return newEntry;
};

// MOVE ASSET BETWEEN BRANCHES
export const moveAssetBranchAPI = async (data) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

    // FIND ASSET
    const asset = products.find((p) => String(p.id) === String(data.asset_id));
    if (!asset) {
        throw new Error("Asset not found");
    }
    // VALIDATE CURRENT STATUS
    if (asset.asset_status !== "active") {
        throw new Error(`Cannot move asset while status is "${asset.asset_status}"`);
    }

    // UPDATE PRODUCT BRANCH
    const updatedProducts = products.map((product) => {
        if (String(product.id) === String(data.asset_id)) {
            return {
                ...product,
                branch_id: data.to_branch_id,
                updated_at: new Date().toISOString(),
            };
        }
        return product;
    });

    setStorage(STORAGE_KEYS.PRODUCTS,updatedProducts);

    // CREATE HISTORY ENTRY
    const newHistory = {
        id: generateId(),
        asset_id: data.asset_id,
        action_type: "moved_branch",
        from_user_id: null,
        to_user_id: null,
        from_branch_id: data.from_branch_id,
        to_branch_id: data.to_branch_id,
        notes: data.notes || "",
        created_at: new Date().toISOString(),
    };

    const updatedHistory = [...history,newHistory];
    setStorage(STORAGE_KEYS.ASSET_HISTORY,updatedHistory);
    return newHistory;
};

// ASSET MAINTENANCE
export const sendToMaintenanceAPI = async (data) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

    // FIND ASSET
    const asset = products.find((p) => String(p.id) === String(data.asset_id));
    if (!asset) {
        throw new Error("Asset not found");
    }
    // VALIDATE CURRENT STATUS
    if (asset.asset_status !== "active") {
        throw new Error(`Only active assets can be sent to maintenance. Current status: "${asset.asset_status}"`);
    }

    // UPDATE ASSET STATUS
    const updatedProducts = products.map((product) => {
        if (String(product.id) === String(data.asset_id)) {
            return {
                ...product,
                asset_status: "maintenance",
            };
        }
        return product;
    });

    setStorage(STORAGE_KEYS.PRODUCTS,updatedProducts);

    // HISTORY ENTRY
    const newHistory = {
        id: generateId(),
        asset_id: data.asset_id,
        action_type: "maintenance_started",
        from_user_id: null,
        to_user_id: null,
        from_branch_id: data.from_branch_id,
        to_branch_id: data.to_branch_id,
        notes: data.notes || "",
        created_at: new Date().toISOString(),
    };

    setStorage(STORAGE_KEYS.ASSET_HISTORY,[...history, newHistory]);
    return newHistory;
};

export const returnFromMaintenanceAPI = async (data) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

    // FIND ASSET
    const asset = products.find((p) => String(p.id) === String(data.asset_id));
    if (!asset) {
        throw new Error("Asset not found");
    }
    // VALIDATE CURRENT STATUS
    if (asset.asset_status !== "maintenance") {
        throw new Error(`Only maintenance assets can be returned. Current status: "${asset.asset_status}"`);
    }

    const updatedProducts = products.map((product) => {
        if (String(product.id) === String(data.asset_id)) {
            return {
                ...product,
                asset_status: "active",
            };
        }
        return product;
    });
    setStorage(STORAGE_KEYS.PRODUCTS,updatedProducts);

    const newHistory = {
        id: generateId(),
        asset_id: data.asset_id,
        action_type: "maintenance_completed",
        from_user_id: null,
        to_user_id: null,
        from_branch_id: data.from_branch_id,
        to_branch_id: data.from_branch_id,
        notes: data.notes || "",
        created_at: new Date().toISOString(),
    };

    setStorage(STORAGE_KEYS.ASSET_HISTORY,[...history, newHistory]);
    return newHistory;
};

export const markAssetDamagedAPI = async (data) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

    // FIND ASSET
    const asset = products.find((p) => String(p.id) === String(data.asset_id));
    if (!asset) {
        throw new Error("Asset not found");
    }
    // VALIDATE CURRENT STATUS
    const allowedStatuses = ["active","maintenance"];
    if (!allowedStatuses.includes(asset.asset_status)) {
        throw new Error(`Asset cannot be marked damaged while status is "${asset.asset_status}"`);
    }

    const updatedProducts = products.map((product) => {
        if (String(product.id) === String(data.asset_id)) {
            return {
                ...product,
                asset_status: "damaged",
            };
        }
        return product;
    });
    setStorage(STORAGE_KEYS.PRODUCTS,updatedProducts);

    const newHistory = {
        id: generateId(),
        asset_id: data.asset_id,
        action_type: "damaged",
        from_user_id: null,
        to_user_id: null,
        from_branch_id: data.from_branch_id,
        to_branch_id: data.from_branch_id,
        notes: data.notes || "",
        created_at:new Date().toISOString(),
    };

    setStorage(STORAGE_KEYS.ASSET_HISTORY,[...history, newHistory]);
    return newHistory;
};

// UPDATE ASSET STATUS
export const updateAssetStatusAPI = async (data) => {
    await fakeDelay();
    const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];

    const newEntry = {
        id: generateId(),
        asset_id: data.asset_id,
        action_type: "status_changed",
        notes: data.notes || "",
        created_at: new Date().toISOString(),
    };

    setStorage(STORAGE_KEYS.ASSET_HISTORY, [
        ...history,
        newEntry,
    ]);

    const updatedProducts = products.map((p) =>
        String(p.id) === String(data.asset_id)
            ? { ...p, asset_status: data.asset_status }
            : p
    );

    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);

    return newEntry;
};