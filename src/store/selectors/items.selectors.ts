import type { RootState } from 'src/store';
import { itemsAdapter } from 'src/store/states/items.state';
import { createSelector } from '@reduxjs/toolkit';

const adapterSelectors = itemsAdapter.getSelectors((state: RootState) => state.items);

export const selectIsFetchingItems = (state: RootState) => state.items.isFetching;
export const selectItemsError = (state: RootState) => state.items.error;
export const selectSavingIds = (state: RootState) => state.items.savingIds;

export const selectIsItemSaving = createSelector(
	selectSavingIds,
	(_: RootState, id: string) => id,
	(idsBeingSaved: string[], id: string) => idsBeingSaved.includes(id),
);

export const itemsSelectors = {
	...adapterSelectors,
	isFetching: selectIsFetchingItems,
	error: selectItemsError,
	savingIds: selectSavingIds,
	isItemSaving: selectIsItemSaving,
};
