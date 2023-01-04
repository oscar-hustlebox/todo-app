import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectTasksSlice = (state: RootState) => state.tasks;

export const getTasks = createSelector(selectTasksSlice, (tasks) => tasks);
