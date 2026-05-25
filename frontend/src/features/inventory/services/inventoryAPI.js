import generateId from "../../../utils/generateId";
import { getStorage, setStorage } from "../../../utils/storage";
import { STORAGE_KEYS } from "../../../constants/storageKeys";

const fakeDelay = (ms = 800) =>
    new Promise((resolve) => setTimeout(resolve, ms));

/* GET ALL PRODUCTS */
export const getProductsAPI = async () => {
    await fakeDelay();
    return getStorage(STORAGE_KEYS.PRODUCTS) || [];
};

/* GET PRODUCT BY ID */
export const getProductByIdAPI = async (id) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    return products.find((product) => String(product.id) === String(id));
};

/* CREATE PRODUCT */
export const createProductAPI = async (data) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];

    const existingSku = products.find((product) => product.sku === data.sku);
    if (existingSku) {
        throw new Error("SKU already exists");
    }

    const newProduct = {
        id: generateId(),
        name: data.name,
        sku: data.sku,
        category_id: Number(data.category_id),
        branch_id: Number(data.branch_id),
        quantity: Number(data.quantity),
        // FIXED: Map form 'price' property safely to storage 'unit_price'
        unit_price: Number(data.price || data.unit_price),
        type: data.type,
        status: data.status || "active",
        asset_status: data.type === "asset" ? data.asset_status : null,
        created_at: new Date(new Date()).toLocaleString('en-IN')
    };

    const updatedProducts = [...products, newProduct];
    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    return newProduct;
};

/* UPDATE PRODUCT */
export const updateProductAPI = async (id, data) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];

    const updatedProducts = products.map((product) => {
        if (String(product.id) === String(id)) {
            return {
                ...product,
                name: data.name,
                sku: data.sku,
                category_id: Number(data.category_id),
                branch_id: Number(data.branch_id),
                quantity: Number(data.quantity),
                // FIXED: Map form 'price' property safely to storage 'unit_price'
                unit_price: Number(data.price || data.unit_price),
                type: data.type,
                status: data.status || "active",
                asset_status: data.type === "asset" ? data.asset_status : null,
                updated_at: new Date(new Date()).toLocaleString('en-IN')
            };
        }
        return product;
    });

    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    return updatedProducts.find((product) => String(product.id) === String(id));
};

/* DELETE PRODUCT */
export const deleteProductAPI = async (id) => {
    await fakeDelay();
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const updatedProducts = products.filter((product) => String(product.id) !== String(id));
    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    return id;
};

/* UPDATE PRODUCT STATUS */
export const updateProductStatusAPI = async ({ id, status }) => {
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const updatedProducts = products.map((product) => 
        String(product.id) === String(id) ? { ...product, status } : product
    );

    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    return { id, status };
};

/* UPDATE ASSET STATUS */
export const updateAssetStatusAPI = async ({ id, asset_status }) => {
    const products = getStorage(STORAGE_KEYS.PRODUCTS) || [];
    const updatedProducts = products.map((product) => 
        String(product.id) === String(id) ? { ...product, asset_status } : product
    );

    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    return { id, asset_status };
};



















// import generateId from "../../../utils/generateId";
// import {
//     getStorage,
//     setStorage,
// } from "../../../utils/storage";
// import { STORAGE_KEYS } from "../../../constants/storageKeys";

// const fakeDelay = (ms = 800) =>
//     new Promise((resolve) =>
//         setTimeout(resolve, ms)
//     );

// /* GET ALL PRODUCTS */
// export const getProductsAPI = async () => {
//         await fakeDelay();
//         return (
//             getStorage(
//                 STORAGE_KEYS.PRODUCTS) || []
//         );
//     };

// /* GET PRODUCT BY ID */
// export const getProductByIdAPI =
//     async (id) => {

//         await fakeDelay();

//         const products =
//             getStorage(
//                 STORAGE_KEYS.PRODUCTS
//             ) || [];

//         return products.find(
//             (product) =>
//                 String(product.id) ===
//                 String(id)
//         );
//     };

// /* CREATE PRODUCT */
// export const createProductAPI =
//     async (data) => {

//         await fakeDelay();

//         const products =
//             getStorage(
//                 STORAGE_KEYS.PRODUCTS
//             ) || [];

//         const existingSku =
//             products.find(
//                 (product) =>
//                     product.sku ===
//                     data.sku
//             );

//         if (existingSku) {
//             throw new Error(
//                 "SKU already exists"
//             );
//         }

//         const newProduct = {
//             id: generateId(),

//             name: data.name,

//             sku: data.sku,

//             category_id: Number(
//                 data.category_id
//             ),

//             branch_id: Number(
//                 data.branch_id
//             ),

//             quantity: Number(
//                 data.quantity
//             ),

//             unit_price: Number(
//                 data.unit_price
//             ),

//             type: data.type,

//             status:
//                 data.status ||
//                 "active",

//             asset_status:
//                 data.type === "asset"
//                     ? data.asset_status
//                     : null,
//         };

//         const updatedProducts = [
//             ...products,
//             newProduct,
//         ];

//         setStorage(
//             STORAGE_KEYS.PRODUCTS,
//             updatedProducts
//         );

//         return newProduct;
//     };

// /* UPDATE PRODUCT */
// export const updateProductAPI =
//     async (
//         id,
//         data
//     ) => {

//         await fakeDelay();

//         const products =
//             getStorage(
//                 STORAGE_KEYS.PRODUCTS
//             ) || [];

//         const updatedProducts =
//             products.map(
//                 (product) => {

//                     if (
//                         String(product.id) ===
//                         String(id)
//                     ) {

//                         return {
//                             ...product,
//                             ...data,

//                             category_id:
//                                 Number(
//                                     data.category_id
//                                 ),

//                             branch_id:
//                                 Number(
//                                     data.branch_id
//                                 ),

//                             quantity:
//                                 Number(
//                                     data.quantity
//                                 ),

//                             unit_price:
//                                 Number(
//                                     data.unit_price
//                                 ),
//                         };
//                     }

//                     return product;
//                 }
//             );

//         setStorage(
//             STORAGE_KEYS.PRODUCTS,
//             updatedProducts
//         );

//         return updatedProducts.find(
//             (product) =>
//                 String(product.id) ===
//                 String(id)
//         );
//     };

// /* DELETE PRODUCT */
// export const deleteProductAPI =
//     async (id) => {

//         await fakeDelay();

//         const products =
//             getStorage(
//                 STORAGE_KEYS.PRODUCTS
//             ) || [];

//         const updatedProducts =
//             products.filter(
//                 (product) =>
//                     String(product.id) !==
//                     String(id)
//             );

//         setStorage(
//             STORAGE_KEYS.PRODUCTS,
//             updatedProducts
//         );

//         return id;
//     };

// /* UPDATE PRODUCT STATUS */
// export const updateProductStatusAPI =
//     async ({
//         id,
//         status,
//     }) => {

//         const products =
//             getStorage(
//                 STORAGE_KEYS.PRODUCTS
//             ) || [];

//         const updatedProducts =
//             products.map(
//                 (product) => {

//                     if (
//                         String(product.id) ===
//                         String(id)
//                     ) {

//                         return {
//                             ...product,
//                             status,
//                         };
//                     }

//                     return product;
//                 }
//             );

//         setStorage(
//             STORAGE_KEYS.PRODUCTS,
//             updatedProducts
//         );

//         return {
//             id,
//             status,
//         };
//     };

// /* UPDATE ASSET STATUS */
// export const updateAssetStatusAPI =
//     async ({
//         id,
//         asset_status,
//     }) => {

//         const products =
//             getStorage(
//                 STORAGE_KEYS.PRODUCTS
//             ) || [];

//         const updatedProducts =
//             products.map(
//                 (product) => {

//                     if (
//                         String(product.id) ===
//                         String(id)
//                     ) {

//                         return {
//                             ...product,
//                             asset_status,
//                         };
//                     }

//                     return product;
//                 }
//             );

//         setStorage(
//             STORAGE_KEYS.PRODUCTS,
//             updatedProducts
//         );

//         return {
//             id,
//             asset_status,
//         };
//     };