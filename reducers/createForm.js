import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    currentStep: 0,
    steps: [],
    otherparam: {},
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
    resetCreateForm: (state) => {
      state.value = initialState.value;
    },
    updateParamCharacter: (state, action) => {
      state.value.otherparam = {
        ...state.value.otherparam,
        characterName: action.payload
      }
    },
    updateParamWeather: (state, action) => {
      state.value.otherparam = {
        ...state.value.otherparam,
        weather: action.payload
      }
    }
  },
});

export const {
  updateCurrentStep,
  updateStep,
  updateIsGenerating,
  updateIsFinished,
  resetCreateForm,
  updateParamCharacter,
  updateParamWeather,
} = createFormSlice.actions;
export default createFormSlice.reducer;
