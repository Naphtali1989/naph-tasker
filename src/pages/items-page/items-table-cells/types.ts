import type { Item } from 'src/types';

export type CommonCellProps = {
	row: Item;
	savingIds?: string[];
	onFieldChange?: (id: string, field: keyof Item, value: unknown) => void;
	onFieldSave?: (id: string, field: keyof Item, value: unknown) => void;
	onSave?: (id: string) => void;
	onDelete?: (id: string) => void;
}
