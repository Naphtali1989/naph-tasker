import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { itemsAdapter, initialItemsState } from 'src/store/states/items.state';

const itemsSlice = createSlice({
	name: 'items',
	initialState: initialItemsState,
	reducers: {
		setFetching: (state, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		setAll: itemsAdapter.setAll,
		addOne: itemsAdapter.addOne,
		addMany: itemsAdapter.addMany,
		removeOne: itemsAdapter.removeOne,
		removeMany: itemsAdapter.removeMany,
		upsertOne: itemsAdapter.upsertOne,
		upsertMany: itemsAdapter.upsertMany,
		addSavingId: (state, action: PayloadAction<string>) => {
			state.savingIds.push(action.payload);
		},
		removeSavingId: (state, action: PayloadAction<string>) => {
			state.savingIds = state.savingIds.filter((id) => id !== action.payload);
		},
	},
});

export const itemsLocalActions = itemsSlice.actions;
export default itemsSlice.reducer;
