import { createSlice } from "@reduxjs/toolkit";

const initialValue: {
    value: Array<any>
} = {
    value: []
};

const playerListSlice = createSlice({
    name: "playerListSlice",
    initialState: initialValue,

    reducers: {
        addPlayer: (state, data) => {
            state.value.push(data.payload);
        },

        addPlayers: (state, data) => {
            state.value = data.payload;
        },

        resetPlayerList: (state) => {
            state.value.length = 0;
        }
    }
});

export const { addPlayer, addPlayers, resetPlayerList } = playerListSlice.actions;
export default playerListSlice.reducer;