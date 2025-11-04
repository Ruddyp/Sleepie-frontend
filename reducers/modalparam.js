import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        modalState: false,
        modalStateCharacter: false,
        modalStateWeather: false
    },
};

export const modalParamSlice = createSlice({
    name: "modalParam",

    initialState,
    reducers: {
        updateModalParamState: (state, action) => {
            state.value.modalState = action.payload;
        },
        updateModalStateCharacter: (state, action) => {
            state.value.modalStateCharacter = action.payload;
        },
        updateModalParamStateWeather: (state, action) => {
            state.value.modalStateWeather = action.payload;
        },
    },
});

export const { updateModalParamState, updateModalStateCharacter, updateModalParamStateWeather } = modalParamSlice.actions;
export default modalParamSlice.reducer;
