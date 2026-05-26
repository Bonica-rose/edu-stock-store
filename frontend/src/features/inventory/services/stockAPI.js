import { getProductByIdAPI, updateProductAPI } from "./inventoryAPI";
import { getStorage, setStorage } from "../../../utils/storage";
import generateId from "../../../utils/generateId";
import { STORAGE_KEYS } from "../../../constants/storageKeys";

/* CREATE STOCK MOVEMENT + UPDATE PRODUCT */
export const createStockMovementAPI = async ({
    product_id,
    quantity,
    userId,
    branchId,
    movement_type,
    remarks,
}) => {
    await new Promise((r) => setTimeout(r, 500));

    // 1. find product
    const product = await getProductByIdAPI(product_id);

    if (!product) throw new Error("Product not found");

    // 2. calculate qty
    const qtyChange =
        movement_type === "stock_in"
            ? Number(quantity)
            : -Number(quantity);

    const newQty = Number(product.quantity) + qtyChange;

    // 3. stock validation
    if (newQty < 0) {
        throw new Error("Insufficient stock");
    }

    // 4. update product qty
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const updatedProducts = products.map((item) => {
        if (String(item.id) === String(product_id)) {
            return {
                ...item,
                quantity: newQty,
                updated_at: new Date().toISOString(),
            };
        }
        return item;
    });

    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    const updatedProduct = updatedProducts.find(
        (item) => String(item.id) === String(product_id)
    );

    // 5. create stock movement
    const movements = getStorage(STORAGE_KEYS.STOCK_MOVEMENTS) || [];

    const newMovement = {
        id: generateId(),
        product_id,
        movement_type,
        quantity: Number(quantity),
        previous_qty: product.quantity,
        new_qty: newQty,
        remarks: remarks || "",
        user_id: userId,
        branch_id: branchId,
        created_at: new Date().toISOString(),
    };

    const updatedMovements = [newMovement, ...movements];
    setStorage(STORAGE_KEYS.STOCK_MOVEMENTS, updatedMovements);

    // 6. return
    return {
        product: updatedProduct,
        movement: newMovement,
    };
};

export const getStockMovementsAPI = async () => {
    await new Promise((r) => setTimeout(r, 300));

    return (
        getStorage(STORAGE_KEYS.STOCK_MOVEMENTS) || []
    );
};