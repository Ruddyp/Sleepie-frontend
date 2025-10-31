import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    modalState: false,
  },
};

export const modalSlice = createSlice({
  name: "modal",

  initialState,
  reducers: {
    updateModalState: (state, action) => {
      state.value.modalState = action.payload;
    },
  },
});

export const { updateModalState } = modalSlice.actions;
export default modalSlice.reducer;
