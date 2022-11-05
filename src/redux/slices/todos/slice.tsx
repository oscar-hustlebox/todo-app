import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type TodoState = {
    id: string;
    name: string;
    isComplete: boolean;
};

export type TodosState = TodoState[];

export const initialState: TodosState = [
    {
        id: uuidv4(),
        name: 'Walk the dog',
        isComplete: false,
    },
    {
        id: uuidv4(),
        name: 'Wash the car',
        isComplete: true,
    },
    {
        id: uuidv4(),
        name: 'Take out the trash',
        isComplete: true,
    },
    {
        id: uuidv4(),
        name: 'Buy groceries',
        isComplete: false,
    },
];

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getTodos: (state, action) => {
            state = action.payload;
        },
        addTodo: (state, action) => {
            return [...state, action.payload];
        },
        removeTodo: (state, action) => {
            return state.filter((asset) => asset.id !== action.payload);
        },
        updateTodo: (state, action) => {
            return state.map((asset) => {
                if (asset.id === action.payload.id) {
                    return { ...asset, ...action.payload };
                }
                return asset;
            });
        },
    },
});

// Action creators are generated for each case reducer function
export const { getTodos, addTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;
