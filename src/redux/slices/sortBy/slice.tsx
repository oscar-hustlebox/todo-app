import { createSlice } from '@reduxjs/toolkit';

export type SortByState = {
    sortBy: 'asc' | 'desc';
};

export const initialState: SortByState = {
    sortBy: 'asc',
};

export const sortBySlice = createSlice({
    name: 'sortBy',
    initialState,
    reducers: {
        sortByChanged: (state, action) => {
            return {
                // Copy the whole state
                ...state,
                // Override the property we're interested in
                sortBy: action.payload,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { sortByChanged } = sortBySlice.actions;

export default sortBySlice.reducer;
