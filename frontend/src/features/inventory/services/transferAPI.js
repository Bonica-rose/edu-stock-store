import generateId from "../../../utils/generateId";
import { getStorage, setStorage } from "../../../utils/storage";
import { STORAGE_KEYS } from "../../../constants/storageKeys";

/* CREATE BRANCH TRANSFER */
export const createBranchTransferAPI = async ({
    product_id,
    from_branch_id,
    to_branch_id,
    quantity,
    remarks,
    user_id,
}) => {
    await new Promise((r) => setTimeout(r, 500));

    // VALIDATIONS
    if (String(from_branch_id) === String(to_branch_id)) {
        throw new Error("Source and destination branch cannot be same");
    }

    const qty = Number(quantity);
    if (qty <= 0) {
        throw new Error("Invalid transfer quantity");
    }

    // GET INVENTORY PRODUCTS
    const inventoryProducts = getStorage(STORAGE_KEYS.PRODUCTS) || [];

    // SOURCE INVENTORY
    const sourceInventory = inventoryProducts.find(
        (item) =>
            String(item.id) === String(product_id) &&
            String(item.branch_id) === String(from_branch_id)
    );

    if (!sourceInventory) {
        throw new Error("Source branch product not found");
    }

    // STOCK VALIDATION
    if (Number(sourceInventory.quantity) < qty) {
        throw new Error("Insufficient stock in source branch");
    }

    // DESTINATION INVENTORY
    let destinationInventory = inventoryProducts.find(
        (item) =>
            item.sku === sourceInventory.sku &&
            String(item.branch_id) === String(to_branch_id)
    );

    // CREATE DESTINATION INVENTORY IF NOT EXISTS
    if (!destinationInventory) {
        destinationInventory = {
            ...sourceInventory,
            id: generateId(),
            branch_id: Number(to_branch_id),
            quantity: 0,
            created_at: new Date().toISOString(),
        };
        inventoryProducts.push(destinationInventory);
    }

    // UPDATE STOCKS
    const updatedInventoryProducts = inventoryProducts.map((item) => {
        // SOURCE UPDATE
        if (String(item.id) === String(sourceInventory.id)) {
            return {
                ...item,
                quantity: Number(item.quantity) - qty,
                updated_at: new Date().toISOString(),
            };
        }

        // DESTINATION UPDATE
        if (String(item.id) === String(destinationInventory.id)) {
            return {
                ...item,
                quantity: Number(item.quantity) + qty,
                updated_at: new Date().toISOString(),
            };
        }

        return item;
    });

    // SAVE INVENTORY
    setStorage(STORAGE_KEYS.PRODUCTS, updatedInventoryProducts);

    // STOCK MOVEMENTS
    const stockMovements = getStorage(STORAGE_KEYS.STOCK_MOVEMENTS) || [];
    
    // OUT MOVEMENT
    const stockOutMovement = {
        id: generateId(),
        product_id: sourceInventory.id,
        movement_type: "stock_out",
        quantity: qty,
        previous_qty: Number(sourceInventory.quantity),
        new_qty: Number(sourceInventory.quantity) - qty,
        remarks: remarks || "Branch transfer out",
        branch_id: Number(from_branch_id),
        user_id,
        created_at: new Date().toISOString(),
    };

    // IN MOVEMENT
    const stockInMovement = {
        id: generateId(),
        product_id: destinationInventory.id,
        movement_type: "stock_in",
        quantity: qty,
        previous_qty: Number(destinationInventory.quantity),
        new_qty: Number(destinationInventory.quantity) + qty,
        remarks: remarks || "Branch transfer in",
        branch_id: Number(to_branch_id),
        user_id,
        created_at: new Date().toISOString(),
    };

    const updatedMovements = [stockOutMovement, stockInMovement, ...stockMovements];
    setStorage(STORAGE_KEYS.STOCK_MOVEMENTS, updatedMovements);

    // CREATE TRANSFER RECORD
    const transfers = getStorage(STORAGE_KEYS.BRANCH_TRANSFERS) || [];

    const newTransfer = {
        id: generateId(),
        product_id,
        from_branch_id: Number(from_branch_id),
        to_branch_id: Number(to_branch_id),
        quantity: qty,
        remarks: remarks || "",
        user_id,
        stock_out_movement_id: stockOutMovement.id,
        stock_in_movement_id: stockInMovement.id,
        created_at: new Date().toISOString(),
    };

    const updatedTransfers = [newTransfer, ...transfers];
    setStorage(STORAGE_KEYS.BRANCH_TRANSFERS, updatedTransfers);

    return {
        transfer: newTransfer,
        stock_out: stockOutMovement,
        stock_in: stockInMovement,
        inventory_products: updatedInventoryProducts,
    };
};

/* FETCH BRANCH TRANSFERS */
export const getBranchTransfersAPI = async () => {
    await new Promise((r) => setTimeout(r, 300));
    return getStorage(STORAGE_KEYS.BRANCH_TRANSFERS) || [];
};

/* FETCH BRANCH TRANSFERS BY ID */
export const getTransferByIdAPI = async (id) => {
    await new Promise((r) => setTimeout(r, 300));
    const transfers = getStorage(STORAGE_KEYS.BRANCH_TRANSFERS) || [];
    return transfers.find((item) => String(item.id) === String(id));
};
