// src/redux/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';
import { addTask, deleteTask, fetchTasks, toggleTaskCompletion } from '../service/FirebaseFirestore';

interface TodoState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    // Add some dummy data to see the UI initially
    tasks: [],
    loading: false,
    error: null,
};



const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => { state.loading = true });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        });

        // Adding task
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.tasks.unshift(action.payload as Task);
        });

        // Toggle
        builder.addCase(toggleTaskCompletion.fulfilled, (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) {
                task.isCompleted = !task.isCompleted;
            }
        });

        // Delete
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        });
    }
});

export default todoSlice.reducer;