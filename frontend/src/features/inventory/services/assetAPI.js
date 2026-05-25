import { getStorage, setStorage } from "../../../utils/storage";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import generateId from "../../../utils/generateId";

const fakeDelay = (ms = 500) =>
    new Promise((res) => setTimeout(res, ms));

/* GET ASSET HISTORY */
export const getAssetHistoryAPI = async (asset_id) => {
    await fakeDelay();

    const history =
        getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

    return history.filter(
        (item) =>
            String(item.asset_id) === String(asset_id)
    );
};

// ASSIGN ASSET
export const assignAssetAPI = async (data) => {
    await fakeDelay();

    const history =
        getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

    const products =
        getStorage(STORAGE_KEYS.PRODUCTS) || [];

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

// MOVE BRANCH 
// export const moveAssetBranchAPII = async (data) => {
//     await fakeDelay();

//     const history =
//         getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

//     const newEntry = {
//         id: generateId(),
//         asset_id: data.asset_id,
//         action_type: "moved_branch",
//         from_branch_id: data.from_branch_id,
//         to_branch_id: data.to_branch_id,
//         notes: data.notes || "",
//         created_at: new Date(new Date()).toLocaleString('en-IN')        
//     };

//     const updatedHistory = [...history, newEntry];
//     setStorage(STORAGE_KEYS.ASSET_HISTORY, updatedHistory);

//     return newEntry;
// };
export const moveAssetBranchAPI = async (data) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

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
        from_branch_id: data.from_branch_id,
        to_branch_id: data.to_branch_id,
        notes: data.notes || "",
        created_at: new Date(new Date()).toLocaleString('en-IN')   
    };

    const updatedHistory = [
        ...history,
        newHistory,
    ];

    setStorage(STORAGE_KEYS.ASSET_HISTORY,updatedHistory);
    return newHistory;
};

// MAINTENANCE 
// export const sendToMaintenanceAPII = async (data) => {
//     await fakeDelay();

//     const history =
//         getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

//     const products =
//         getStorage(STORAGE_KEYS.PRODUCTS) || [];

//     const newEntry = {
//         id: generateId(),
//         asset_id: data.asset_id,
//         action_type: "maintenance",
//         notes: data.notes || "",
//         created_at: new Date().toISOString(),
//     };

//     setStorage(STORAGE_KEYS.ASSET_HISTORY, [
//         ...history,
//         newEntry,
//     ]);

//     const updatedProducts = products.map((p) =>
//         String(p.id) === String(data.asset_id)
//             ? { ...p, asset_status: "maintenance" }
//             : p
//     );

//     setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);

//     return newEntry;
// };
export const sendToMaintenanceAPI =
    async (data) => {
        await fakeDelay();
        const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
        const history = getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];
        // UPDATE ASSET STATUS
        const updatedProducts = products.map((product) => {
            if (String(product.id) === String(data.asset_id)
            ) {
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
            notes: data.notes || "",

            created_at:new Date().toISOString(),
        };

        setStorage(
            STORAGE_KEYS.ASSET_HISTORY,
            [...history, newHistory]
        );

        return newHistory;
    };

// UPDATE ASSET STATUS
export const updateAssetStatusAPI = async (data) => {
    await fakeDelay();

    const history =
        getStorage(STORAGE_KEYS.ASSET_HISTORY) || [];

    const products =
        getStorage(STORAGE_KEYS.PRODUCTS) || [];

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