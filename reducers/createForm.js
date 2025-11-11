import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    currentStep: 0,
    steps: [],
    otherparam: {},
    generationStatus: "initial", // 'initial' | 'generating' | 'success' | 'error'
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
    resetCreateForm: (state) => {
      state.value = initialState.value;
    },
    updateParamCharacter: (state, action) => {
      state.value.otherparam = {
        ...state.value.otherparam,
        characterName: action.payload,
      };
    },
    updateParamWeather: (state, action) => {
      state.value.otherparam = {
        ...state.value.otherparam,
        weather: action.payload,
      };
    },
    startGeneration: (state) => {
      state.value.generationStatus = "generating";
    },
    generationSuccess: (state) => {
      state.value.generationStatus = "success";
    },
    generationError: (state) => {
      state.value.generationStatus = "error";
    },
  },
});

export const {
  updateCurrentStep,
  updateStep,
  resetCreateForm,
  updateParamCharacter,
  updateParamWeather,
  startGeneration,
  generationSuccess,
  generationError,
} = createFormSlice.actions;
export default createFormSlice.reducer;
