import { Table, TableBody, TableCell, TableContainer, TableRow, CircularProgress, Box, Paper } from '@mui/material';
import { TaskerTableHead } from './TaskerTableHead';
import { TaskerTableRow } from './TaskerTableRow';
import type { TaskerTableProps } from './types';

export function TaskerTable<T extends { id: string }>(
	{
		columns,
		rows,
		loading = false,
		selectedIds = [],
		onSelectRow,
		onSelectAll,
		emptyState,
	}: TaskerTableProps<T>) {
	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress/>
			</Box>
		);
	}

	const colSpan = columns.length + (onSelectRow ? 1 : 0);

	return (
		<TableContainer
			component={Paper}
			elevation={0}
			sx={{
				maxHeight: 525,
				border: '1px solid rgba(229, 231, 235, 0.7)',
				boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.03)',
				overflowY: 'auto',
			}}
		>
			<Table stickyHeader sx={{
				'& td': { borderBottom: '1px solid rgba(229, 231, 235, 0.5)' },
				'& th': { borderBottom: '2px solid #E5E7EB' },
				'& tbody tr:last-child td': { borderBottom: 0 },
			}}>
				<TaskerTableHead
					columns={columns}
					rows={rows}
					selectedIds={selectedIds}
					onSelectAll={onSelectAll}
				/>
				<TableBody>
					{rows.length === 0 && emptyState ? (
						<TableRow>
							<TableCell colSpan={colSpan} sx={{ border: 0, p: 0 }}>
								{emptyState}
							</TableCell>
						</TableRow>
					) : rows.map((row) => (
						<TaskerTableRow
							key={row.id}
							row={row}
							columns={columns}
							isSelected={selectedIds.includes(row.id)}
							onSelectRow={onSelectRow}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
