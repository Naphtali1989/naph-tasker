import { useEffect, useRef } from 'react';
import { Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';

const baseTexts = lang.items;

type Props = {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onAddItem: () => void;
	isAddDisabled: boolean;
}

export const ItemsViewHeader = ({ searchQuery, onSearchChange, onAddItem, isAddDisabled }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				inputRef.current?.focus();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);
	
	const handleClear = () => {
		onSearchChange('');
		inputRef.current?.focus();
	};
	
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
			<TextField
				inputRef={inputRef}
				placeholder={baseTexts.searchPlaceholder}
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				size="small"
				sx={{
					backgroundColor: 'white',
					'& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
						WebkitBoxShadow: '0 0 0px 1000px white inset',
						boxShadow: '0 0 0px 1000px white inset',
					},
				}}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<TaskerIcon
									icon="search"
									size={18}
									style={{ color: searchQuery ? '#6366F1' : '#9CA3AF' }}
								/>
							</InputAdornment>
						),
						endAdornment: searchQuery ? (
							<InputAdornment position="end">
								<IconButton size="small" onClick={handleClear} edge="end">
									<TaskerIcon icon="close" size={16} color="#9CA3AF"/>
								</IconButton>
							</InputAdornment>
						) : (
							<InputAdornment position="end">
								<Box component="kbd" sx={{
									px: 1,
									py: 0.5,
									borderRadius: '6px',
									fontSize: '0.7rem',
									fontWeight: 500,
									fontFamily: 'inherit',
									color: '#9CA3AF',
									backgroundColor: '#F3F4F6',
									border: '1px solid #E5E7EB',
									boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.05)',
								}}>
									{baseTexts.searchShortcut}
								</Box>
							</InputAdornment>
						),
					},
				}}
			/>
			<Button
				variant="outlined"
				onClick={onAddItem}
				disabled={isAddDisabled}
				startIcon={<TaskerIcon icon="add" size={18}/>}
				size="small"
			>
				{baseTexts.addItem}
			</Button>
		</Box>
	);
};
