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
        deleteUser: (state) => {
            state.value = {
                token: null,
                email: null,
                username: null
            }
        }
    },
});

export const { updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;