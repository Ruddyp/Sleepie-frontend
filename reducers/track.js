import { createSlice } from "@reduxjs/toolkit";
import { State } from "react-native-track-player";

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
    playbackState: State.Paused,
    seekTo: null,
  },
};

export const trackSlice = createSlice({
  name: "track",

  initialState,
  reducers: {
    updateTrack: (state, action) => {
      state.value.track = action.payload;
    },
    updateShouldPlayAutomatically: (state, action) => {
      state.value.shouldPlayAutomatically = action.payload;
    },
    updatePlaybackState: (state, action) => {
      state.value.playbackState = action.payload;
    },
    updateSeekTo: (state, action) => {
      state.value.seekTo = action.payload;
    },
    resetTrack: (state) => {
      state.value = initialState.value;
    },
  },
});

export const {
  updateTrack,
  updateShouldPlayAutomatically,
  updatePlaybackState,
  updateSeekTo,
  resetTrack,
} = trackSlice.actions;
export default trackSlice.reducer;
