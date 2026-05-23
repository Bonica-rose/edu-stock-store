import roles from "../../../mock/roles.json";
import getRolePermissions from "../../../utils/getRolePermissions";
import generateId from "../../../utils/generateId";
import {STORAGE_KEYS} from "../../../constants/storageKeys";
import generateTempPassword from "../../../utils/generateTempPassword";
import {
    getStorage,
    setStorage,
} from "../../../utils/storage";

const fakeDelay = (ms = 800) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );

/*GENERATE MOCK JWT TOKEN*/
const generateToken = (user) => {
    return btoa(
        JSON.stringify({
            id: user.id,
            email: user.email,
            role_id: user.role_id,
            timestamp: Date.now(),
        })
    );
};

/*GET USERS*/
export const getUsers = () => {
    return (
        getStorage(STORAGE_KEYS.USERS) || []
    );
};

/*SAVE USERS*/
export const saveUsers = (users) => {
    setStorage(STORAGE_KEYS.USERS, users);
};

/*CREATE FIRST SUPER ADMIN*/
export const createInitialSuperAdmin = async (data) => {
    await fakeDelay();
    const users = getUsers();

    if (users.length > 0) {
        throw new Error("Super admin already exists");
    }

    const superAdminRole =
        roles.find(
            (role) => role.name === "super_admin"
        );

    const newUser = {
        id: generateId(),
        username: data.username,
        email: data.email,
        password: data.password,
        role_id:superAdminRole.id,
        branch_id: 1,
        must_change_password: false,
        status: "active",
    };

    users.push(newUser);    
    const token = generateToken(newUser);
    saveUsers(users);

    setStorage(STORAGE_KEYS.TOKEN, token);
    setStorage(STORAGE_KEYS.USER, newUser);

    return {
        user: newUser,
        token:token,
        permissions: getRolePermissions(superAdminRole.id) || [],
        message: "Super Admin Registration successful",
    };
};

/*REGISTER USER*/
export const registerUser = async (data) => {
    await fakeDelay();
    const users = getUsers();
    const existingUser =
        users.find(
            (user) => user.email === data.email
        );

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const staffRole = roles.find(
        (role) => role.name === "staff"
    );

    const newUser = {
        id: generateId(),
        username:data.username,
        email: data.email,
        password:data.password,
        role_id:staffRole.id,
        branch_id: 1,
        must_change_password:false,
        status: "active",
    };

    users.push(newUser);
    saveUsers(users);
    return {
        message: "Registration successful",
    };
};

/*CREATE USER BY SUPER ADMIN*/
export const createUserByAdmin = async (data) => {
    await fakeDelay();
    const users = getUsers();
    const existingUser =
        users.find(
            (user) => user.email === data.email
        );

    if (existingUser) {
        throw new Error( "Email already exists");
    }

    const tempPassword = generateTempPassword(8);
    const newUser = {
        id: generateId(),
        username: data.username,
        email: data.email,
        password: tempPassword,
        role_id: data.role_id,
        branch_id: data.branch_id || 1,
        must_change_password: true,
        status: "active",
    };

    users.push(newUser);
    saveUsers(users);
    return {
        user: newUser,
        tempPassword,
    };
};

/*LOGIN USER*/
export const loginUser = async (data) => {
    await fakeDelay();
    const users = getUsers();
    const user = users.find(
        (user) => user.email === data.email && user.password === data.password
    );

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (user.status !== "active") {
        throw new Error("User account inactive");
    }

    const role = roles.find(
        (role) => role.id === user.role_id
    );

    const permissions = getRolePermissions(role.id) || [];  

    const token = generateToken(user);
    setStorage(STORAGE_KEYS.TOKEN, token);
    setStorage(STORAGE_KEYS.USER, user);
    setStorage(STORAGE_KEYS.PERMISSIONS, permissions);

    return {
        user,
        token,
        permissions,
    };
};

/*FORCE PASSWORD CHANGE*/
export const forceChangePassword = async ({userId, newPassword,}) => {
    await fakeDelay();

    const users = getUsers();

    const updatedUsers =
        users.map((user) => {
            if (user.id === userId) {
                return {
                    ...user,
                    password: newPassword,
                    must_change_password: false,
                };
            }
            return user;
        });

    saveUsers(updatedUsers);
    return {
        message:
            "Password changed successfully",
    };
};