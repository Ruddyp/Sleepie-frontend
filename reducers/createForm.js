import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    currentStep: 0,
    steps: [],
  },
};

export const createFormSlice = createSlice({
  name: "createForm",

  initialState,
  reducers: {
    updateCurrentStep: (state, action) => {
      state.value.currentStep = action.payload;
    },
    updateStep: (state, action) => {
      const stepToUpdate = action.payload.currentStep - 1;
      state.value.steps[stepToUpdate] = { response: action.payload.response };
    },
  },
});

export const { updateCurrentStep, updateStep } = createFormSlice.actions;
export default createFormSlice.reducer;
