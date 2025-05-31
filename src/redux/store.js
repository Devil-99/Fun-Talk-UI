import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import socketReducer from './slices/socketSlice';

const persistedAuth = localStorage.getItem('TechTalk-user')
    ?
    {
        user: JSON.parse(localStorage.getItem('TechTalk-user')),
        loading: false,
        error: null,
    }
    : {
        user: null,
        loading: false,
        error: null,
    };

export const store = configureStore({
    reducer: {
        login: loginReducer,
        socket: socketReducer
    },
    preloadedState: {
        login: persistedAuth
    }
});