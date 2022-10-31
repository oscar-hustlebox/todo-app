import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type AssetState = {
    id: string;
    key: string;
    name: string;
    description: string;
    quantity: number;
    status: 'online' | 'offline' | 'pending';
};

export type AssetsState = AssetState[];

export const initialState: AssetsState = [
    {
        id: uuidv4(),
        key: 'confluence',
        name: 'Confluence',
        description: 'Manage software development projects',
        quantity: 1,
        status: 'pending',
    },
    {
        id: uuidv4(),
        key: 'github',
        name: 'Github',
        description: 'Code hosting platform',
        quantity: 3,
        status: 'online',
    },
    {
        id: uuidv4(),
        key: 'jira',
        name: 'Jira',
        description: 'Create issues',
        quantity: 1,
        status: 'online',
    },
    {
        id: uuidv4(),
        key: 'new asset',
        name: 'New Asset',
        description: 'New Asset description',
        quantity: 2,
        status: 'pending',
    },
];

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        getAssets: (state, action) => {
            state = action.payload;
        },
        addAsset: (state, action) => {
            return [...state, action.payload];
        },
        removeAsset: (state, action) => {
            return state.filter((asset) => asset.id !== action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { getAssets, addAsset, removeAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
