
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie library
import { setLogoutTimer } from "./authUtils.js";


// Thunk for logging in the user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5035/api/Authentication/login', userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'PPA_KEY': 'SvnqwrRcCGE_RSMS_KEY5xWUYcI3aLAi4=PPa'
                },
            });
            console.log("API response:", response);
            if (response.data && response.data.Token) {
                sessionStorage.setItem('token', response.data.Token);
                sessionStorage.setItem('userId', response.data.userId);
                sessionStorage.setItem('role', response.data.role);

                // Save token in a cookie that expires in 7 days
                Cookies.set('token', response.data.Token, { expires: 7 });
                Cookies.set('email', response.data.email, { expires: 7 });


                setLogoutTimer(dispatch, response.data.Token);
                return response.data;
            } else {
                return rejectWithValue('Login failed: No token returned');
            }
        } catch (error) {
            console.error("API error", error);
            return rejectWithValue(error.response ? error.response.data : 'Network error or Server is not responding');
        }
    }
);



// Initialize the userId from the cookie if it exists
const initialUserId = sessionStorage.getItem('userId') || null;
const initialRole = sessionStorage.getItem('role') || null;
const initialEmail = Cookies.get('email');



export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: Boolean(sessionStorage.getItem('token')),
        token: sessionStorage.getItem('token'),
    
        userId: initialUserId,  // Initialize userId 
        email: initialEmail,
        role: initialRole,  // Initialize role 
        status: "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('role');

            Cookies.remove('token');
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.Token;
                state.userId = action.payload.userId;  // Store userId in state
                state.role = action.payload.role;  // Store role in state
                state.email = action.payload.email;  // Store role in state

                state.status = "succeeded";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || 'Could not log in. Please try again.';
                state.isAuthenticated = false;
            });
    }
});

export const { logout, } = authSlice.actions;

export const selectUserId = (state) => state.auth.userId;
export const selectRole = (state) => state.auth.role;
export const selectEmail = (state) => state.auth.email;


export default authSlice.reducer;



