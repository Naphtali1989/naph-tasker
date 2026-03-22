import { TextField, Box, IconButton, CircularProgress, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';
import { isValidItemName, SAMPLE_ITEM_ID } from 'src/utils';
import type { CommonCellProps } from './types';

export const NameCell = ({ row, onFieldChange, onFieldSave, onSave, onDelete, savingIds }: CommonCellProps) => {
	const isSampleItem = row.id === SAMPLE_ITEM_ID;
	const [ isFocused, setIsFocused ] = useState(false);
	const [ localValue, setLocalValue ] = useState(row.name);
	const inputRef = useRef<HTMLInputElement>(null);
	
	const showInput = isFocused || isSampleItem;
	const showActions = isFocused || isSampleItem;
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (isSampleItem) {
			onFieldChange?.(row.id, 'name', value);
		} else {
			setLocalValue(value);
		}
	};
	
	const handleSave = () => {
		if (!isSampleItem) {
			onFieldSave?.(row.id, 'name', localValue);
		} else {
			onSave?.(row.id);
		}
		inputRef.current?.blur();
	};
	
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSave();
		if (e.key === 'Escape') {
			setLocalValue(row.name);
			inputRef.current?.blur();
		}
	};
	
	const handleFocus = () => {
		setLocalValue(row.name);
		setIsFocused(true);
	};
	
	const handleBlur = () => {
		setLocalValue(row.name);
		setIsFocused(false);
	};
	
	const displayValue = isSampleItem ? row.name : localValue;
	const isInvalid = !isValidItemName(displayValue);
	
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<Box sx={{ flex: 1, position: 'relative' }}>
				{showInput ? (
					<TextField
						inputRef={inputRef}
						autoFocus
						value={displayValue}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onFocus={handleFocus}
						onBlur={handleBlur}
						size="small"
						fullWidth
						variant="standard"
						error={isInvalid}
						helperText={
							displayValue.length < 2 ? lang.validation.nameTooShort :
								displayValue.length > 60 ? lang.validation.nameTooLong : ''
						}
						slotProps={{
							formHelperText: {
								sx: {
									position: 'absolute',
									top: '100%',
									margin: 0,
									whiteSpace: 'nowrap',
								},
							},
						}}
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
									<TaskerIcon icon="checkCircle" size={18}/>
								</IconButton>
							</Box>
							<Box sx={{
								opacity: showActions ? 1 : 0,
								'.MuiTableRow-root:hover &': { opacity: 1 },
								transition: 'opacity 0.15s',
							}}>
								<IconButton size="small" color="error" onClick={() => onDelete?.(row.id)}>
									<TaskerIcon icon="trash" size={18}/>
								</IconButton>
							</Box>
						</>
					)
				}
			</Box>
		</Box>
	);
};
