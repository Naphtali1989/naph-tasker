import { TextField, Box, IconButton, CircularProgress, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { lang } from 'src/lang';
import { isValidItemName, SAMPLE_ITEM_ID } from 'src/utils';
import type { CommonCellProps } from './types';

export const NameCell = ({ row, onFieldChange, onSave, onDelete, savingIds }: CommonCellProps) => {
	const isSampleItem = row.id === SAMPLE_ITEM_ID;
	const [ isFocused, setIsFocused ] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const showInput = isFocused || isSampleItem;
	const showActions = isFocused || isSampleItem;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onFieldChange?.(row.id, 'name', e.target.value);
	};
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onSave?.(row.id);
	};
	const handleSave = () => {
		onSave?.(row.id);
		inputRef.current?.blur();
	};
	const handleDelete = () => onDelete?.(row.id);

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<Box sx={{ flex: 1, position: 'relative' }}>
				{showInput ? (
					<TextField
						inputRef={inputRef}
						autoFocus
						value={row.name}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						size="small"
						fullWidth
						variant="standard"
						error={!isValidItemName(row.name)}
						helperText={
							row.name.length < 2 ? lang.validation.nameTooShort :
								row.name.length > 60 ? lang.validation.nameTooLong : ''
						}
						slotProps={{ formHelperText: { sx: { position: 'absolute', top: '100%', margin: 0, whiteSpace: 'nowrap' } } }}
					/>
				) : (
					<Typography
						onClick={() => setIsFocused(true)}
						sx={{ cursor: 'text', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'pre' }}
					>
						{row.name}
					</Typography>
				)}
			</Box>
			<Box onMouseDown={(e) => e.preventDefault()} sx={{ display: 'flex', gap: 0.5 }}>
				{savingIds?.includes(row.id)
					? <CircularProgress size={20}/>
					: (
						<>
							<Box sx={{ opacity: showActions ? 1 : 0, transition: 'opacity 0.15s' }}>
								<IconButton size="small" color="success" onClick={handleSave}>
									<CheckCircleOutlineIcon fontSize="small"/>
								</IconButton>
							</Box>
							<Box sx={{ opacity: showActions ? 1 : 0, '.MuiTableRow-root:hover &': { opacity: 1 }, transition: 'opacity 0.15s' }}>
								<IconButton size="small" color="error" onClick={handleDelete}>
									<DeleteOutlineIcon fontSize="small"/>
								</IconButton>
							</Box>
						</>
					)
				}
			</Box>
		</Box>
	);
};
