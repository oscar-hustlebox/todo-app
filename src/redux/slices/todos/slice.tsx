import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type TodoState = {
    id: string;
    description: string;
    isComplete: boolean;
};

export type TodosState = TodoState[];

export const initialState: TodosState = [
    {
        id: uuidv4(),
        description: 'Manage software development projects',
        isComplete: false,
    },
    {
        id: uuidv4(),
        description: 'Code hosting platform',
        isComplete: true,
    },
    {
        id: uuidv4(),
        description: 'Create issues',
        isComplete: true,
    },
    {
        id: uuidv4(),
        description: 'New Asset description',
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
    },
});

// Action creators are generated for each case reducer function
export const { getTodos, addTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;
