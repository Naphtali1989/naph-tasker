import { IconButton, CircularProgress, Box } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import type { CommonCellProps } from './types';

export const ActionsCell = ({ row, savingIds, onSave, onDelete }: CommonCellProps) => {
	const handleSave = () => onSave?.(row.id);
	const handleDelete = () => onDelete?.(row.id);

	if (savingIds?.includes(row.id)) return <CircularProgress size={20}/>;

	return (
		<Box sx={{ display: 'flex', gap: 0.5 }}>
			<IconButton size="small" color="primary" onClick={handleSave}>
				<TaskerIcon icon="save" size={18}/>
			</IconButton>
			<IconButton size="small" color="error" onClick={handleDelete}>
				<TaskerIcon icon="trash" size={18}/>
			</IconButton>
		</Box>
	);
};
