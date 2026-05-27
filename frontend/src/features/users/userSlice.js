import { createSlice } from "@reduxjs/toolkit";

import {
    fetchUsersThunk,
    fetchActiveUsersThunk,
    createUserThunk,
    updateUserThunk,
    deleteUserThunk,
    fetchUserByIdThunk,
    updateUserStatusThunk,
} from "./userThunk";

const initialState = {
    users: [],
    selectedUser: null,
    currentUserProfile: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearSelectedUser: (state) => {
            state.selectedUser = null; // Fixed: Set to null explicitly
        },      
        clearCurrentUserProfile: (state) => {
            state.currentUserProfile = null; // Clear on logout if needed
        }
    },

    extraReducers: (builder) => {
        builder

            /* FETCH USERS */
            .addCase(fetchUsersThunk.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersThunk.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // FETCH ACTIVE USERS
            .addCase(fetchActiveUsersThunk.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActiveUsersThunk.fulfilled,(state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchActiveUsersThunk.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            /* FETCH USER BY ID */
            .addCase(fetchUserByIdThunk.fulfilled,
                (state, action) => {
                    state.selectedUser = action.payload;
                }
            )

            /* CREATE USER BY SUPER ADMIN */
            .addCase(createUserThunk.fulfilled,(state, action) => {
                state.users.push(action.payload);
            })

            /* UPDATE CREATE USER BY SUPER ADMIN */
            .addCase(updateUserThunk.fulfilled,(state, action) => {
                state.users =
                    state.users.map(
                        (user) => {
                            if (user.id === action.payload.id
                            ) {
                                return action.payload;
                            }

                            return user;
                        }
                    );
            })
            
        // UPDATE USER STATUS 
        .addCase(updateUserStatusThunk.fulfilled, (state, action) => {
            const { id, status } = action.payload;

            const user = state.users.find((u) => u.id === id);
            if (user) {
                user.status = status;
            }
        })

        /* DELETE */
        .addCase(deleteUserThunk.fulfilled,(state, action) => {
            state.users =
                state.users.filter(
                    (user) => user.id !== action.payload
                );
        });
    },
});

export const {
    clearSelectedUser,
    currentUserProfile
} = userSlice.actions;

export default userSlice.reducer;