import {configureStore} from "@reduxjs/toolkit";
import treeReducer from "./treeSlice";
import {api} from "./api";

export const store = configureStore({
    reducer: {
        tree: treeReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectTreeData = (state: RootState) => state.tree;