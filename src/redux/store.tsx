import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import tasksReducer from './slices/tasks/slice';
import sortByReducer from './slices/sortBy/slice';
import boardReducer from './slices/board/slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    tasks: tasksReducer,
    sortBy: sortByReducer,
    board: boardReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
