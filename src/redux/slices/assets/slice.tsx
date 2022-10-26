import { createSlice } from '@reduxjs/toolkit';

export type AssetState = {
    id: number;
    key: string;
    name: string;
    description: string;
    quantity: number;
    status: 'Online' | 'Offline' | 'Pending';
};

export type AssetsState = AssetState[];

export const initialState: AssetsState = [
    {
        id: 0,
        key: 'confluence',
        name: 'Confluence',
        description: 'Manage software development projects',
        quantity: 1,
        status: 'Pending',
    },
    {
        id: 1,
        key: 'github',
        name: 'Github',
        description: 'Code hosting platform',
        quantity: 3,
        status: 'Online',
    },
    {
        id: 2,
        key: 'jira',
        name: 'Jira',
        description: 'Create issues',
        quantity: 1,
        status: 'Online',
    },
    {
        id: 3,
        key: 'new asset',
        name: 'New Asset',
        description: 'New Asset description',
        quantity: 2,
        status: 'Pending',
    },
];

export const assetsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getAssets: (state, action) => {
            state = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getAssets } = assetsSlice.actions;

export default assetsSlice.reducer;
