import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/store/slices/auth.slice';
import itemsReducer from 'src/store/slices/items.slice';
export const store = configureStore({
	reducer: {
		auth: authReducer,
		items: itemsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
