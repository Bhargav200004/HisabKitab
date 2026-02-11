// This file manages auth forms state

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import auth from '@react-native-firebase/auth';
import { signupUser, loginUser, logoutUser } from "../service/FirebaseAuthentication";

interface AuthState {
    user: { uid: string; email: string | null } | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Sign Up function
        builder.addCase(signupUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });

        builder.addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })


        // Login 
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        // Logout 
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        });
    }
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;