import { useState } from 'react';
import { Box } from '@mui/material';
import { TaskerTable } from 'src/components/tasker-table';
import { ItemsSelectionBanner } from './ItemsSelectionBanner';
import { ItemsEmptyState } from './empty-state';
import { buildColumns } from './columns';
import type { Item } from 'src/types';

type Props = {
	rows: Item[];
	isFetching: boolean;
	savingIds: string[];
	hasFilter: boolean;
	onFieldChange: (id: string, field: keyof Item, value: unknown) => void;
	onFieldSave: (id: string, field: keyof Item, value: unknown) => void;
	onSave: (id: string) => void;
	onDelete: (id: string) => void;
	onAddItem: () => void;
}

export const ItemsTable = ({ rows, isFetching, savingIds, hasFilter, onFieldChange, onFieldSave, onSave, onDelete, onAddItem }: Props) => {
	const [ selectedIds, setSelectedIds ] = useState<string[]>([]);

	const handleSelectRow = (id: string) => {
		setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [ ...prev, id ]);
	};

	const handleSelectAll = () => {
		setSelectedIds((prev) => prev.length === rows.length ? [] : rows.map((r) => r.id));
	};

	const columns = buildColumns({ onFieldChange, onFieldSave, onSave, onDelete, savingIds });

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<ItemsSelectionBanner
				rowCount={rows.length}
				hasFilter={hasFilter}
				selectedIds={selectedIds}
				onClearSelection={() => setSelectedIds([])}
			/>
			<TaskerTable
				columns={columns}
				rows={rows}
				loading={isFetching}
				selectedIds={selectedIds}
				onSelectRow={handleSelectRow}
				onSelectAll={handleSelectAll}
				emptyState={<ItemsEmptyState hasActiveSearch={hasFilter} onAddItem={onAddItem}/>}
			/>
		</Box>
	);
};
