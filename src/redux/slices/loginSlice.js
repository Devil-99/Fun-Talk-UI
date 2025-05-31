import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: true,
        user: null,
    },
    reducers: {
        loginLoading: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;

            localStorage.setItem('TechTalk-user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isLogged = false;
            state.user = null;
        },
    },
});

export const { loginLoading, loginSuccess, logout } = loginSlice.actions;
export default loginSlice.reducer;