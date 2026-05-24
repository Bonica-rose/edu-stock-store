import { STORAGE_KEYS } from "../constants/storageKeys";

export const clearAuthStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    // optional extras
    localStorage.removeItem("profile");
    localStorage.removeItem("permissions");
};