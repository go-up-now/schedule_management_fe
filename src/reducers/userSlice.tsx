// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
        },
        logoutUser(state) {
            state.isLoggedIn = false;
            state.userInfo = null;
            state.token = null;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
