import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from '@react-native-firebase/auth';

export const signupUser = createAsyncThunk(
    'auth/signup',
    async ({ email, password }: any, { rejectWithValue }) => {
        try {
            const auth = getAuth(); // Get the auth instance
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { uid, email: userEmail } = userCredential.user;
            return { uid, email: userEmail };
        } catch (error: any) {
            // Firebase errors often come as formatted strings, we clean them up slightly
            return rejectWithValue(error.message || error.code);
        }
    }
);

export const getUserId = () => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authentication");
    return user.uid;
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: any, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const { uid, email: userEmail } = userCredential.user;
            return { uid, email: userEmail };
        } catch (error: any) {
            return rejectWithValue(error.message || error.code);
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    const auth = getAuth();
    await signOut(auth);
});