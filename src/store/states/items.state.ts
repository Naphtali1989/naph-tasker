import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Item } from 'src/types';

export type ItemsExtraState = {
	isFetching: boolean
	savingIds: string[]
	error: string | null
}

export const itemsAdapter = createEntityAdapter<Item>({
	sortComparer: (a, b) => b.orderIndex - a.orderIndex,
});

export const initialItemsState = itemsAdapter.getInitialState<ItemsExtraState>(
{
	isFetching: false,
	savingIds: [],
	error: null,
});
