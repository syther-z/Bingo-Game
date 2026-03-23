import { configureStore } from "@reduxjs/toolkit";
import tileSlice from "./slice/TileSlice";

export const store = configureStore({
    reducer: {
        // playerList: playerListSlice
        tileSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;