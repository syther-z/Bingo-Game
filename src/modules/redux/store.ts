import { configureStore } from "@reduxjs/toolkit";
import tileSlice from "./slice/TileSlice";
import toastSlice from "./slice/ToastSlice";
import playerListSlice from './slice/PlayerListSlice';
export const store = configureStore({
    reducer: {
        // playerList: playerListSlice
        tileSlice,
        toastSlice,
        playerListSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;