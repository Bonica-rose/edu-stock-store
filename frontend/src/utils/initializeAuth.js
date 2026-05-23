import { getStorage } from "./storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const initializeAuth = () => {

    const token = getStorage(STORAGE_KEYS.TOKEN);
    const user = getStorage(STORAGE_KEYS.USER);
    const permissions = getStorage(STORAGE_KEYS.PERMISSIONS) || [];

    return {
        token,
        user,
        permissions,
        isAuthenticated:
            !!token && !!user,
    };
};