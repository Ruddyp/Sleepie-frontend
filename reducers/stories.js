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
        updateLikedStories: (state, action) => { },
        setLikedStories: (state, action) => {
            state.value.likedStories = action.payload;
        },
        updateCreatedStories: (state, action) => { },
        setCreatedStories: (state, action) => {
            state.value.createdStories = action.payload;
        },
    },
});

export const { updateLikedStories, setLikedStories, updateCreatedStoriesn, setCreatedStories } =
    storiesSlice.actions;
export default storiesSlice.reducer;