import { createSlice } from "@reduxjs/toolkit";

type valueType = {
    value: Array<any>;

}

const initialValue : valueType = {
    value: []
};
const toastSlice = createSlice({
    name: "toastSlice",
    initialState: initialValue,

    reducers: {
       addToast: (state, action) => {
        state.value = action.payload;
       }
    }
});

export const { addToast } = toastSlice.actions;
export default toastSlice.reducer;

export type toastSliceType =  ReturnType<typeof toastSlice.reducer>;