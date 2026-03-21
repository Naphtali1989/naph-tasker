import { IconButton, CircularProgress, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import type { CommonCellProps } from './types';

export const ActionsCell = ({ row, savingIds, onSave, onDelete }: CommonCellProps) => {
	const handleSave = () => onSave?.(row.id);
	const handleDelete = () => onDelete?.(row.id);

	if (savingIds?.includes(row.id)) return <CircularProgress size={20}/>;

	return (
		<Box sx={{ display: 'flex', gap: 0.5 }}>
			<IconButton size="small" color="primary" onClick={handleSave}>
				<SaveOutlinedIcon fontSize="small"/>
			</IconButton>
			<IconButton size="small" color="error" onClick={handleDelete}>
				<DeleteOutlineIcon fontSize="small"/>
			</IconButton>
		</Box>
	);
};
