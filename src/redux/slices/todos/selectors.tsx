import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectTodosSlice = (state: RootState) => state.todos;

export const getTodos = createSelector(selectTodosSlice, (todos) => todos);
