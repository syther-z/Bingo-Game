import { configureStore } from "@reduxjs/toolkit";
import tileSlice from "./slice/TileSlice";
import toastSlice from "./slice/ToastSlice";
export const store = configureStore({
    reducer: {
        // playerList: playerListSlice
        tileSlice,
        toastSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;