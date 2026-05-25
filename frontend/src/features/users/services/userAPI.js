import generateId from "../../../utils/generateId";
import {
    getStorage,
    setStorage,
} from "../../../utils/storage";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import generateTempPassword from "../../../utils/generateTempPassword";
import generateNameFromAccount from "../../../utils/generateName";


const fakeDelay = (ms = 800) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );

export const getUsersAPI = async () => {
    await fakeDelay();
    return (getStorage(STORAGE_KEYS.USERS) || []);
};

export const getUserByIdAPI = async (id) => {
    await fakeDelay();
    const users = getStorage(STORAGE_KEYS.USERS) || [];

    return users.find(
        (user) => String(user.id) === String(id)
    );
};

export const createUserAPI = async (data) => {
    await fakeDelay();
    const users = getStorage(STORAGE_KEYS.USERS) || [];
    const existingUser = users.find(
        (user) => user.email === data.email
    );

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const newUser = {
        id: generateId(),
        username: data.username,
        email: data.email,
        password: generateTempPassword(8),
        role_id: Number(data.role_id),
        branch_id: Number(data.branch_id),
        fullname: generateNameFromAccount(data.username, data.email),
        must_change_password: true,
        status: data.status || "active",
    };

    const updatedUsers = [
        ...users,
        newUser,
    ];

    setStorage(STORAGE_KEYS.USERS,updatedUsers);
    return newUser;
};

export const updateUserAPI = async (id, data) => {
    await fakeDelay();
    const users = getStorage(STORAGE_KEYS.USERS) || [];

    const updatedUsers = users.map(
        (user) => {
            if (String(user.id) === String(id)) {
                return {
                    ...user,
                    ...data,
                    fullname: generateNameFromAccount(data.username, data.email),
                };
            }
            return user;
        }
    );

    setStorage(STORAGE_KEYS.USERS,updatedUsers);

    return updatedUsers.find(
        (user) => String(user.id) === String(id)
    );
};

export const deleteUserAPI = async (id) => {
    await fakeDelay();
    const users = getStorage(STORAGE_KEYS.USERS) || [];
    const updatedUsers = users.filter(
        (user) => String(user.id) !== String(id)
    );
    setStorage(STORAGE_KEYS.USERS,updatedUsers);
    return id;
};

export const updateUserStatusAPI = async ({ id, status }) => {
    // await fakeDelay();
    const users = getStorage(STORAGE_KEYS.USERS) || [];

    const updatedUsers = users.map((user) => {
            if (String(user.id) === String(id)) {
                return {
                    ...user,
                    status,
                };
            }
            return user;
        }
    );
    setStorage(STORAGE_KEYS.USERS,updatedUsers);
    return {
        id,
        status,
    };
};