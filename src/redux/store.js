import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice'; // Import your slices

export const store = configureStore({
    reducer: {
        login: loginReducer,
    },
});