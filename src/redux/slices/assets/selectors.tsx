import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectAssetsSlice = (state: RootState) => state.assets;

export const getAssets = createSelector(selectAssetsSlice, (assets) => assets);
