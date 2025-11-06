import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    track: {
      _id: null,
      url: null,
      author: null,
      created_at: null,
      like: null,
      listen_counter: null,
      label: null,
      title: null,
      configuration: null,
      image: null,
    },
    shouldPlayAutomatically: false,
  },
};

export const trackSlice = createSlice({
  name: "track",

  initialState,
  reducers: {
    updateTrack: (state, action) => {
      state.value = action.payload;
    },
    resetTrack: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { updateTrack, resetTrack } = trackSlice.actions;
export default trackSlice.reducer;
