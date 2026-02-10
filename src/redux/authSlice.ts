// This file manages auth forms state

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    email: string;
    password: string;
    confirmPassword?: string;
    isLoading: boolean;
}

const initialState: AuthState = {
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ field: keyof AuthState, value: string }>) => {
            // @ts-ignore - dynamix key assignment
            state[action.payload.field] = action.payload.value;
        },
        resetForm: (state) => {
            state.email = '';
            state.password = '';
            state.confirmPassword = '';
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }

        // TODO: async function all here later

    }
});

export const { updateField, resetForm, setLoading } = authSlice.actions;
export default authSlice.reducer;