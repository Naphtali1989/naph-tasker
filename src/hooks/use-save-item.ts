import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { itemsActions } from 'src/store/actions/items.actions';
import { itemsSelectors } from 'src/store/selectors/items.selectors';
import { createSampleItem, isValidItemName } from 'src/utils';
import { toast } from 'src/providers/toast/toast';
import { lang } from 'src/lang';
import type { Item, Status, Priority } from 'src/types';

export const useSaveItem = (filteredItems: Item[]) => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(itemsSelectors.selectAll);

	const [localEdits, setLocalEdits] = useState<Record<string, Partial<Item>>>({});
	const [sampleItem, setSampleItem] = useState<Item | null>(null);

	const rows = useMemo(() => {
		const merged = filteredItems.map((item) => ({ ...item, ...localEdits[item.id] }));
		return sampleItem ? [sampleItem, ...merged] : merged;
	}, [filteredItems, localEdits, sampleItem]);

	const clearEdits = (id: string) => {
		setLocalEdits((prev) => {
			const next = { ...prev };
			delete next[id];
			return next;
		});
	};

	const dispatchUpdate = async (id: string, merged: Item) => {
		const success = await dispatch(itemsActions.updateItem({
			id,
			payload: {
				name: merged.name,
				status: merged.status as Status,
				priority: merged.priority as Priority,
			},
		}));
		clearEdits(id);
		if (!success) toast.error(lang.toasts.saveFailed);
	};

	const handleFieldChange = (id: string, field: keyof Item, value: unknown) => {
		if (sampleItem && id === sampleItem.id) {
			setSampleItem((prev) => prev ? { ...prev, [field]: value } : prev);
			return;
		}
		setLocalEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
	};

	const handleSave = async (id: string) => {
		if (sampleItem && id === sampleItem.id) {
			if (!isValidItemName(sampleItem.name)) return;
			const payload = { ...sampleItem };
			setSampleItem(null);
			const success = await dispatch(itemsActions.createItem(payload));
			if (success) toast.success(lang.toasts.itemCreated);
			else toast.error(lang.toasts.createItemFailed);
			return;
		}
		const edits = localEdits[id];
		if (!edits) return;
		const original = items.find((i) => i.id === id);
		if (!original) return;
		const merged = { ...original, ...edits };
		if (!isValidItemName(merged.name)) return;
		await dispatchUpdate(id, merged);
	};

	const handleFieldSave = async (id: string, field: keyof Item, value: unknown) => {
		if (sampleItem && id === sampleItem.id) {
			setSampleItem((prev) => prev ? { ...prev, [field]: value } : prev);
			return;
		}
		const original = items.find((i) => i.id === id);
		if (!original) return;
		const merged = { ...original, ...localEdits[id], [field]: value };
		if (!isValidItemName(merged.name)) return;
		await dispatchUpdate(id, merged);
	};

	const handleAddItem = () => setSampleItem(createSampleItem());

	const handleDelete = async (id: string) => {
		if (sampleItem && id === sampleItem.id) {
			setSampleItem(null);
			return;
		}
		const success = await dispatch(itemsActions.deleteItem(id));
		if (success) toast.success(lang.toasts.itemDeleted);
		else toast.error(lang.toasts.deleteItemFailed);
	};

	return { rows, sampleItem, handleFieldChange, handleSave, handleFieldSave, handleAddItem, handleDelete };
};
