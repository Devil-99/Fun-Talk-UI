// src/slices/socketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { host } from '../../utils/apiRoutes';

let socket = null; // Private module-scoped variable

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        connected: false,
    },
    reducers: {
        initializeSocket: (state) => {
            if (!socket) {
                socket = io(host); // or hardcoded
                state.connected = true;

                console.log("✅ Socket initialized");

                // Optional: handle global listeners
                socket.on('connect', () => {
                    console.log('🔌 Socket connected:', socket.id);
                });

                socket.on('disconnect', () => {
                    console.log('❌ Socket disconnected');
                    state.connected = false;
                });
            }
        },
        disconnectSocket: (state) => {
            if (socket) {
                socket.disconnect();
                socket = null;
                state.connected = false;
                console.log('🔌 Socket manually disconnected');
            }
        },
    },
});

// Export actions
export const { initializeSocket, disconnectSocket } = socketSlice.actions;

// Export reducer
export default socketSlice.reducer;

// Export function to get socket instance
export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket not initialized. Dispatch initializeSocket first.");
    }
    return socket;
};
