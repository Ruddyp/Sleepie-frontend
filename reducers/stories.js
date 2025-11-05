import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    likedStories: [],
    createdStories: [],
  },
};

export const storiesSlice = createSlice({
  name: "stories",

  initialState,
  reducers: {
    updateLikedStories: (state, action) => {
      const { _id } = action.payload;
      if (state.value.likedStories.some((e) => e._id === _id)) {
        state.value.likedStories = state.value.likedStories.filter((e) => e._id !== _id);
      } else {
        state.value.likedStories.unshift(action.payload);
      }
    },
    setLikedStories: (state, action) => {
      state.value.likedStories = action.payload;
    },
    updateCreatedStories: (state, action) => {
      state.value.createdStories.unshift(action.payload);
    },
    setCreatedStories: (state, action) => {
      state.value.createdStories = action.payload;
    },
    resetStories: (state) => {
      state.value = {
        likedStories: [],
        createdStories: [],
      }
    }
  },
});

export const { updateLikedStories, setLikedStories, updateCreatedStories, setCreatedStories, resetStories } =
  storiesSlice.actions;
export default storiesSlice.reducer;
