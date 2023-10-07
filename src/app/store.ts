import {configureStore} from "@reduxjs/toolkit";
import treeReducer from "../services/treeSlice";
import {api} from "../services/api";

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