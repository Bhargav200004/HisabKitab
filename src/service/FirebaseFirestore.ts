import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserId } from './FirebaseAuthentication';
import firestore from '@react-native-firebase/firestore';
import { Task } from '../types/task';

export const fetchTasks = createAsyncThunk('todos/fetchTasks', async (_, { rejectWithValue }) => {
    try {
        const uid = getUserId();
        const snapshot = await firestore()
            .collection('users')
            .doc(uid)
            .collection('tasks')
            .orderBy('date', 'desc')
            .get();

        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
        return tasks;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const addTask = createAsyncThunk('todos/addTask', async (taskData: Omit<Task, 'id' | 'isCompleted'>, { rejectWithValue }) => {
    try {
        const uid = getUserId();
        const newTask = {
            ...taskData,
            isCompleted: false,
            createdAt: firestore.FieldValue.serverTimestamp(),
        };

        const docRef = await firestore()
            .collection('users')
            .doc(uid)
            .collection('tasks')
            .add(newTask);

        // Return task with the new Cloud ID
        return { id: docRef.id, isCompleted: false, ...taskData };
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const toggleTaskCompletion = createAsyncThunk('todos/toggleTask', async ({ id, isCompleted }: { id: string, isCompleted: boolean }, { rejectWithValue }) => {
    try {
        const uid = getUserId();
        await firestore()
            .collection('users')
            .doc(uid)
            .collection('tasks')
            .doc(id)
            .update({ isCompleted: !isCompleted });

        return id; // Return ID to update local state
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteTask = createAsyncThunk('todos/deleteTask', async (id: string, { rejectWithValue }) => {
    try {
        const uid = getUserId();
        await firestore().collection('users').doc(uid).collection('tasks').doc(id).delete();
        return id;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});