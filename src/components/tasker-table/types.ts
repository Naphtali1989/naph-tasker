import type { ReactNode } from 'react';

export type Column<T> = {
	key: string;
	header: string;
	renderCell: (row: T) => ReactNode;
	width?: string;
}

export type TaskerTableProps<T extends { id: string }> = {
	columns: Column<T>[];
	rows: T[];
	loading?: boolean;
	selectedIds: string[];
	onSelectAll?: () => void;
	onSelectRow?: (id: string) => void;
}

export type TaskerTableHeadProps<T> = {
	columns: Column<T>[];
	rows: T[];
	selectedIds: string[];
	onSelectAll?: () => void;
}

export type TaskerTableRowProps<T extends { id: string }> = {
	row: T;
	columns: Column<T>[];
	isSelected: boolean;
	onSelectRow?: (id: string) => void;
}
