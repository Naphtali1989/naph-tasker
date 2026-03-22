import { useState } from 'react';
import { TaskerTable } from 'src/components/tasker-table';
import { ItemsTableFooter } from './ItemsTableFooter.tsx';
import { buildColumns } from './columns';
import type { Item } from 'src/types';

type Props = {
	rows: Item[];
	isFetching: boolean;
	savingIds: string[];
	onFieldChange: (id: string, field: keyof Item, value: unknown) => void;
	onFieldSave: (id: string, field: keyof Item, value: unknown) => void;
	onSave: (id: string) => void;
	onDelete: (id: string) => void;
}

export const ItemsTable = ({ rows, isFetching, savingIds, onFieldChange, onFieldSave, onSave, onDelete }: Props) => {
	const [ selectedIds, setSelectedIds ] = useState<string[]>([]);
	
	const handleSelectRow = (id: string) => {
		setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [ ...prev, id ]);
	};
	
	const handleSelectAll = () => {
		setSelectedIds((prev) => prev.length === rows.length ? [] : rows.map((r) => r.id));
	};
	
	const columns = buildColumns({ onFieldChange, onFieldSave, onSave, onDelete, savingIds });
	
	return (
		<>
			<TaskerTable
				columns={columns}
				rows={rows}
				loading={isFetching}
				selectedIds={selectedIds}
				onSelectRow={handleSelectRow}
				onSelectAll={handleSelectAll}
			/>
			{selectedIds.length > 0 && (
				<ItemsTableFooter
					selectedIds={selectedIds}
					onClearSelection={() => setSelectedIds([])}
				/>
			)}
		</>
	);
};
