import * as mockApi from 'src/api/mock';
import type { CreateItemPayload, UpdateItemPayload, Item } from 'src/types';
import { wrapWithClient } from 'src/api/client.ts';
import type { AppDispatch, RootState } from 'src/store';
import { itemsLocalActions } from 'src/store/slices/items.slice';
import { SAMPLE_ITEM_ID, createSampleItem } from 'src/utils';

const getItems = wrapWithClient(mockApi.getItems);
const createItem = wrapWithClient(mockApi.createItem);
const updateItem = wrapWithClient(mockApi.updateItem);
const updateItems = wrapWithClient(mockApi.updateItems);
const deleteItem = wrapWithClient(mockApi.deleteItem);
const deleteItems = wrapWithClient(mockApi.deleteItems);

type Thunk<T = boolean> = (dispatch: AppDispatch, getState: () => RootState) => Promise<T>;

const fetchItemsThunk = (): Thunk => async (dispatch) => {
	dispatch(itemsLocalActions.setFetching(true));
	dispatch(itemsLocalActions.setError(null));
	try {
		const items = await getItems();
		dispatch(itemsLocalActions.setAll(items));
		return true;
	} catch (error: unknown) {
		dispatch(itemsLocalActions.setError((error as { message: string }).message));
		return false;
	} finally {
		dispatch(itemsLocalActions.setFetching(false));
	}
};

const createItemThunk = (payload: CreateItemPayload): Thunk => async (dispatch) => {
	dispatch(itemsLocalActions.addOne(createSampleItem(payload)));
	try {
		const item = await createItem(payload);
		dispatch(itemsLocalActions.removeOne(SAMPLE_ITEM_ID));
		dispatch(itemsLocalActions.addOne(item));
		return true;
	} catch {
		dispatch(itemsLocalActions.removeOne(SAMPLE_ITEM_ID));
		return false;
	}
};

const updateItemThunk = ({ id, payload }: { id: string; payload: UpdateItemPayload }): Thunk =>
	async (dispatch, getState) => {
		const original = getState().items.entities[id];
		dispatch(itemsLocalActions.addSavingId(id));
		if (original) dispatch(itemsLocalActions.upsertOne({ ...original, ...payload }));
		try {
			const result = await updateItem(id, payload);
			dispatch(itemsLocalActions.upsertOne(result));
			return true;
		} catch {
			if (original) dispatch(itemsLocalActions.upsertOne(original));
			return false;
		} finally {
			dispatch(itemsLocalActions.removeSavingId(id));
		}
	};

const updateItemsThunk = ({ ids, payload }: { ids: string[]; payload: UpdateItemPayload }): Thunk =>
	async (dispatch, getState) => {
		const entities = getState().items.entities;
		const originals = ids.map((id) => entities[id]).filter((item): item is Item => item !== undefined);
		dispatch(itemsLocalActions.upsertMany(originals.map((item) => ({ ...item, ...payload }))));
		try {
			const result = await updateItems(ids, payload);
			dispatch(itemsLocalActions.upsertMany(result));
			return true;
		} catch {
			dispatch(itemsLocalActions.upsertMany(originals));
			return false;
		}
	};

const deleteItemThunk = (id: string): Thunk => async (dispatch, getState) => {
	const original = getState().items.entities[id];
	dispatch(itemsLocalActions.removeOne(id));
	try {
		await deleteItem(id);
		return true;
	} catch {
		if (original) dispatch(itemsLocalActions.addOne(original));
		return false;
	}
};

const deleteItemsThunk = (ids: string[]): Thunk => async (dispatch, getState) => {
	const entities = getState().items.entities;
	const originals = ids.map(id => entities[id]).filter((item): item is Item => item !== undefined);
	dispatch(itemsLocalActions.removeMany(ids));
	try {
		await deleteItems(ids);
		return true;
	} catch {
		dispatch(itemsLocalActions.addMany(originals));
		return false;
	}
};

export const itemsActions = {
	fetchItems: fetchItemsThunk,
	createItem: createItemThunk,
	updateItem: updateItemThunk,
	updateItems: updateItemsThunk,
	deleteItem: deleteItemThunk,
	deleteItems: deleteItemsThunk,
};
