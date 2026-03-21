import { createSlice } from '@reduxjs/toolkit';
import { initialAuthState } from 'src/store/states/auth.state';
import { loginThunk, logoutThunk } from 'src/store/actions/auth.actions';

const authSlice = createSlice(
{
	name: 'auth',
	initialState: initialAuthState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(loginThunk.pending, (state) => {
			state.isLoggingIn = true;
			state.error = null;
		})
		.addCase(loginThunk.fulfilled, (state) => {
			state.isLoggingIn = false;
			state.isAuthenticated = true;
		})
		.addCase(loginThunk.rejected, (state, action) => {
			state.isLoggingIn = false;
			state.error = action.payload as string;
		})
		.addCase(logoutThunk.fulfilled, (state) => {
			state.isAuthenticated = false;
			state.error = null;
		});
	},
});

export default authSlice.reducer;
