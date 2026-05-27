import generateId from "../../../../utils/generateId";
import {
    getStorage,
    setStorage,
} from "../../../../utils/storage";
import { STORAGE_KEYS } from "../../../../constants/storageKeys";

const fakeDelay = (ms = 500) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );

// =========================================
// GET ALL VENDORS
// =========================================
export const getAllVendorsAPI =
    async () => {

        await fakeDelay();

        return (
            getStorage(
                STORAGE_KEYS.VENDORS
            ) || []
        );
    };

// =========================================
// GET VENDOR BY ID
// =========================================
export const getVendorByIdAPI =
    async (id) => {

        await fakeDelay();

        const vendors =
            getStorage(
                STORAGE_KEYS.VENDORS
            ) || [];

        return vendors.find(
            (vendor) =>
                String(vendor.id) ===
                String(id)
        );
    };

// =========================================
// CREATE VENDOR
// =========================================
export const createVendorAPI =
    async (vendorData) => {

        await fakeDelay();

        const vendors =
            getStorage(
                STORAGE_KEYS.VENDORS
            ) || [];

        const newVendor = {

            id: generateId(),

            created_at:
                new Date().toISOString(),

            updated_at:
                new Date().toISOString(),

            ...vendorData,
        };

        const updatedVendors = [
            newVendor,
            ...vendors,
        ];

        setStorage(
            STORAGE_KEYS.VENDORS,
            updatedVendors
        );

        return newVendor;
    };

// =========================================
// UPDATE VENDOR
// =========================================
export const updateVendorAPI =
    async (
        id,
        vendorData
    ) => {

        await fakeDelay();

        const vendors =
            getStorage(
                STORAGE_KEYS.VENDORS
            ) || [];

        const updatedVendors =
            vendors.map((vendor) => {

                if (
                    String(vendor.id) ===
                    String(id)
                ) {

                    return {

                        ...vendor,

                        ...vendorData,

                        updated_at:
                            new Date().toISOString(),
                    };
                }

                return vendor;
            });

        setStorage(
            STORAGE_KEYS.VENDORS,
            updatedVendors
        );

        return updatedVendors.find(
            (vendor) =>
                String(vendor.id) ===
                String(id)
        );
    };

// =========================================
// DELETE VENDOR
// =========================================
export const deleteVendorAPI =
    async (id) => {

        await fakeDelay();

        const vendors =
            getStorage(
                STORAGE_KEYS.VENDORS
            ) || [];

        const filteredVendors =
            vendors.filter(
                (vendor) =>
                    String(vendor.id) !==
                    String(id)
            );

        setStorage(
            STORAGE_KEYS.VENDORS,
            filteredVendors
        );

        return id;
    };