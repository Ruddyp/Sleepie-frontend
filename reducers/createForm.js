import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    currentStep: 0,
    steps: [],
    isGenerating: false,
    isFinished: false,
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
    updateIsGenerating: (state) => {
      state.value.isGenerating = !state.value.isGenerating;
    },
    updateIsFinished: (state) => {
      state.value.isFinished = !state.value.isFinished;
    },
  },
});

export const { updateCurrentStep, updateStep, updateIsGenerating, updateIsFinished } =
  createFormSlice.actions;
export default createFormSlice.reducer;
