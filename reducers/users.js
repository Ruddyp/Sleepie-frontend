import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    email: null,
    username: null,
    recently_played: [],
  },
};

export const usersSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
    deleteUser: (state) => {
      state.value = {
        token: null,
        email: null,
        username: null,
        recently_played: [],
      };
    },
    updateRecentlyPlayed: (state, action) => {
      const storyToAdd = action.payload;
      const storyIdToAdd = storyToAdd._id;

      const filteredList = state.value.recently_played.filter(
        (story) => story._id !== storyIdToAdd
      );

      filteredList.unshift(storyToAdd);

      if (filteredList.length > 10) {
        filteredList.pop(); // Retire le dernier élément
      }

      state.value.recently_played = filteredList;
    },
  },
});

export const { updateUser, deleteUser, updateRecentlyPlayed } = usersSlice.actions;
export default usersSlice.reducer;
