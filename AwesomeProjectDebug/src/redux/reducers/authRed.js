import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoading: false,
    userToken: null,
    userInfo: null,
  };
  
const authSlice = createSlice({
name: 'auth', // Optional name for the slice
initialState,
reducers: {
    loginRequest: (state) => {
    state.isLoading = true;
    },
    loginSuccess: (state, action) => {
    state.isLoading = false;
    state.userInfo = action.payload;
    state.userToken = action.payload.accessToken;
    },
    loginFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.error;
    },
    logout: (state) => {
    state.userToken = null;
    state.userInfo = null;
    },
},
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
