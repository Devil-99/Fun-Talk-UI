import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: true,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLogged = false;
            state.user = null;
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;