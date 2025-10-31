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
    modalState: null,
    playerState: null,
  },
};

export const trackSlice = createSlice({
  name: "track",

  initialState,
  reducers: {
    updateTrack: (state, action) => {
      state.value.track = action.payload;
    },
    updateModalState: (state, action) => {
      state.value.modalState = action.payload;
    },
  },
});

export const { updateTrack, updateModalState } = trackSlice.actions;
export default trackSlice.reducer;
