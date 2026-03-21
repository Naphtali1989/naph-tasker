import { Status, Priority } from 'src/types';
import type { Item } from 'src/types';

export const SAMPLE_ITEM_ID = 'sample-item';

export const isValidItemName = (name: string) => name.length >= 2 && name.length <= 60;

export const createSampleItem = (overrides: Partial<Omit<Item, 'id'>> = {}): Item => ({
	id: SAMPLE_ITEM_ID,
	name: '',
	status: Status.Open,
	priority: Priority.P3,
	orderIndex: Date.now(),
	updatedAt: Date.now(),
	...overrides,
});
