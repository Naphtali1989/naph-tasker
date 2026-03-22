import type { Column } from 'src/components/tasker-table';
import type { Item } from 'src/types';
import { lang } from 'src/lang';
import { NameCell, StatusCell, PriorityCell, UpdatedAtCell } from './items-table-cells';

type ColumnContext = {
	onFieldChange: (id: string, field: keyof Item, value: unknown) => void
	onFieldSave: (id: string, field: keyof Item, value: unknown) => void
	onDelete: (id: string) => void
	onSave: (id: string) => void
	savingIds: string[]
}

const baseTexts = lang.columns;

export const buildColumns = (context: ColumnContext): Column<Item>[] => [
	{
		key: 'name',
		header: baseTexts.name,
		renderCell: (row) => (
			<NameCell
				row={row}
				onFieldChange={context.onFieldChange}
				onFieldSave={context.onFieldSave}
				onSave={context.onSave}
				onDelete={context.onDelete}
				savingIds={context.savingIds}
			/>
		),
	},
	{
		key: 'status',
		header: baseTexts.status,
		width: '150px',
		renderCell: (row) => (
			<StatusCell row={row} onFieldSave={context.onFieldSave}/>
		),
	},
	{
		key: 'priority',
		header: baseTexts.priority,
		width: '150px',
		renderCell: (row) => (
			<PriorityCell row={row} onFieldSave={context.onFieldSave}/>
		),
	},
	{
		key: 'updatedAt',
		header: baseTexts.updatedAt,
		width: '150px',
		renderCell: (row) => (
			<UpdatedAtCell row={row}/>
		),
	},
];
