import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTokens, clearTokens } from 'src/api/client';
import * as mockApi from 'src/api/mock';

export const loginThunk = createAsyncThunk(
	'auth/login',
	async (credentials: { username: string; password: string }, { rejectWithValue }) => {
		try {
			const data = await mockApi.login(credentials.username, credentials.password);
			setTokens(data);
			return data;
		} catch (error: unknown) {
			const apiError = error as { message: string; status: number };
			return rejectWithValue({ message: apiError.message, status: apiError.status });
		}
	},
);

export const logoutThunk = createAsyncThunk(
	'auth/logout',
	async () => {
		clearTokens();
	},
);

export const authActions = {
	login: loginThunk,
	logout: logoutThunk,
};
