import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type TodoState = {
    id: string;
    name: string;
    isComplete: boolean;
    favorite: boolean;
};

export type TodosState = TodoState[];

export const initialState: TodosState = [
    {
        id: uuidv4(),
        name: 'Walk the dog',
        isComplete: false,
        favorite: false,
    },
    {
        id: uuidv4(),
        name: 'Wash the car',
        isComplete: true,
        favorite: false,
    },
    {
        id: uuidv4(),
        name: 'Take out the trash',
        isComplete: true,
        favorite: false,
    },
    {
        id: uuidv4(),
        name: 'Buy groceries',
        isComplete: false,
        favorite: true,
    },
];

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getTodos: (_state, action) => {
            return action.payload;
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
        toggleTodoComplete: (state, action) => {
            return state.map((asset) => {
                if (asset.id === action.payload) {
                    return { ...asset, isComplete: !asset.isComplete };
                }
                return asset;
            });
        },
        favoriteTodo: (state, action) => {
            return [...state].map((asset) => {
                console.log('asset', asset);
                if (asset.id === action.payload) {
                    return { ...asset, favorite: !asset.favorite };
                }
                return asset;
            });
        },
    },
});

// Action creators are generated for each case reducer function
export const { getTodos, addTodo, updateTodo, removeTodo, toggleTodoComplete, favoriteTodo } = todosSlice.actions;

export default todosSlice.reducer;
