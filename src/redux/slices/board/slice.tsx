import { createSlice } from '@reduxjs/toolkit';

export type BoardState = {
    id: string;
    name: string;
    url?: string;
    imageURL?: string;
};

export const initialState: BoardState[] = [
    {
        id: '1',
        name: 'ToDo',
    },
    {
        id: '2',
        name: 'In Progress',
    },
    {
        id: '3',
        name: 'Done',
    },
];

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        getBoards: (_state, action) => {
            return action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getBoards } = boardSlice.actions;

export default boardSlice.reducer;
