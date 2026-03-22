import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';
import type { TaskerTableHeadProps } from './types';

export function TaskerTableHead<T>({ columns, rows, selectedIds, onSelectAll }: TaskerTableHeadProps<T>) {
	return (
		<TableHead>
			<TableRow sx={{ backgroundColor: '#F9FAFB' }}>
				{onSelectAll && (
					<TableCell padding="checkbox">
						<Checkbox
							checked={selectedIds.length === rows.length && rows.length > 0}
							indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length}
							onChange={onSelectAll}
							sx={{
								color: '#E5E7EB',
								'&.Mui-checked, &.MuiCheckbox-indeterminate': { color: '#6366F1' },
								'& .MuiSvgIcon-root': { fontSize: 18 },
							}}
						/>
					</TableCell>
				)}
				{columns.map((col) => (
					<TableCell
						key={col.key}
						width={col.width}
						sx={{
							py: '14px',
							px: '16px',
							color: '#9CA3AF',
							fontSize: '11px',
							fontWeight: 600,
							textTransform: 'uppercase',
							letterSpacing: '0.08em',
						}}
					>
						{col.header}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
