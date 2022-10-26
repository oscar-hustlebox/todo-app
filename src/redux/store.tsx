import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import assetsReducer from './slices/assets/slice';

export const store = configureStore({
    reducer: {
        assets: assetsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
