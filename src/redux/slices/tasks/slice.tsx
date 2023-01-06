import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type TaskState = {
    id: string;
    name: string;
    isComplete: boolean;
    favorite: boolean;
    description?: string;
    boardID?: string;
};

export type TasksState = TaskState[];

export const initialState: TasksState = [
    {
        id: uuidv4(),
        name: 'Walk the dog',
        description: 'Take the dog for a walk around the block',
        isComplete: false,
        favorite: false,
        boardID: '1',
    },
    {
        id: uuidv4(),
        name: 'Wash the car',
        description: 'Wash the car with soap and water',
        isComplete: true,
        favorite: false,
        boardID: '1',
    },
    {
        id: uuidv4(),
        name: 'Take out the trash',
        description: 'Take out the trash to the curb',
        isComplete: true,
        favorite: false,
        boardID: '1',
    },
    {
        id: uuidv4(),
        name: 'Buy groceries',
        isComplete: false,
        favorite: true,
        boardID: '3',
    },
];

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            return [...state, action.payload];
        },
        removeTask: (state, action) => {
            return state.filter((asset) => asset.id !== action.payload);
        },
        updateTask: (state, action) => {
            return state.map((asset) => {
                if (asset.id === action.payload.id) {
                    return { ...asset, ...action.payload };
                }
                return asset;
            });
        },
        toggleTaskComplete: (state, action) => {
            return state.map((asset) => {
                if (asset.id === action.payload) {
                    return { ...asset, isComplete: !asset.isComplete };
                }
                return asset;
            });
        },
        favoriteTask: (state, action) => {
            return [...state].map((asset) => {
                if (asset.id === action.payload) {
                    return { ...asset, favorite: !asset.favorite };
                }
                return asset;
            });
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTask, updateTask, removeTask, toggleTaskComplete, favoriteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
