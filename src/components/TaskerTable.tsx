import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Checkbox,
	CircularProgress,
	Box,
	Paper,
} from '@mui/material';
import type { ReactNode } from 'react';

export type Column<T> = {
	key: string;
	header: string;
	renderCell: (row: T) => ReactNode;
	width?: string;
}

type Props<T extends { id: string }> = {
	columns: Column<T>[];
	rows: T[];
	loading?: boolean;
	selectedIds?: string[];
	onSelectRow?: (id: string) => void;
	onSelectAll?: () => void;
}

function TaskerTable<T extends { id: string }>(
	{
		columns,
		rows,
		loading = false,
		selectedIds = [],
		onSelectRow,
		onSelectAll,
	}: Props<T>) {
	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress/>
			</Box>
		);
	}
	
	return (
		<TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
			<Table sx={{ '& td, & th': { borderRight: '1px solid', borderRightColor: 'divider' }, '& td:last-child, & th:last-child': { borderRight: 0 } }}>
				<TableHead>
					<TableRow>
						{onSelectAll && (
							<TableCell padding="checkbox">
								<Checkbox
									checked={selectedIds.length === rows.length && rows.length > 0}
									indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length}
									onChange={onSelectAll}
								/>
							</TableCell>
						)}
						{columns.map((col) => (
							<TableCell
								key={col.key}
								width={col.width}
								sx={{ py: 1.5, color: 'text.secondary', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
							>
								{col.header}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.id}
							selected={selectedIds.includes(row.id)}
						>
							{onSelectRow && (
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedIds.includes(row.id)}
										onChange={() => onSelectRow(row.id)}
									/>
								</TableCell>
							)}
							{columns.map((col) => (
								<TableCell key={col.key} sx={{ py: 1.5 }}>
									{col.renderCell(row)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default TaskerTable;
