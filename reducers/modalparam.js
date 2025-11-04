import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        modalState: false,
    },
};

export const modalParamSlice = createSlice({
    name: "modalParam",

    initialState,
    reducers: {
        updateModalParamState: (state, action) => {
            state.value.modalState = action.payload;
        },
    },
});

export const { updateModalParamState } = modalParamSlice.actions;
export default modalParamSlice.reducer;
