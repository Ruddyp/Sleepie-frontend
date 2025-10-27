import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        token: null,
        email: null,
        username: null
    },
};

export const usersSlice = createSlice({
    name: 'user',

    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { updateUser } = usersSlice.actions;
export default usersSlice.reducer;