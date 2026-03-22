import { TableRow, TableCell, Checkbox } from '@mui/material';
import type { TaskerTableRowProps } from './types';
import { checkboxStyles } from 'src/utils';

export function TaskerTableRow<T extends { id: string }>(
	{
		row,
		columns,
		isSelected,
		onSelectRow,
	}: TaskerTableRowProps<T>) {
	return (
		<TableRow
			selected={isSelected}
			sx={{
				transition: 'all 150ms ease-out',
				backgroundColor: isSelected ? '#EEF2FF' : 'white',
				'&:hover': {
					backgroundColor: isSelected ? 'rgba(238, 242, 255, 0.9)' : 'rgba(243, 244, 246, 0.5)',
				},
				'& td:first-of-type': isSelected
					? { boxShadow: 'inset 3px 0 0 #6366F1' }
					: { '&:hover': { boxShadow: 'inset 3px 0 0 rgba(99, 102, 241, 0.3)' } },
				'&.MuiTableRow-root.Mui-selected': { backgroundColor: '#EEF2FF' },
			}}
		>
			{onSelectRow && (
				<TableCell padding="checkbox">
					<Checkbox
						checked={isSelected}
						onChange={() => onSelectRow(row.id)}
						sx={{ ...checkboxStyles, '& .MuiSvgIcon-root': { fontSize: 18, borderRadius: '6px' } }}
					/>
				</TableCell>
			)}
			{columns.map((col) => (
				<TableCell key={col.key} sx={{ py: '18px', px: '16px' }}>
					{col.renderCell(row)}
				</TableCell>
			))}
		</TableRow>
	);
}
