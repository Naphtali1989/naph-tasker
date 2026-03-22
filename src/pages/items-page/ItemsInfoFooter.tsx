import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';

const baseTexts = lang.infoFooter;
const SESSION_KEY = 'info-banner-dismissed';

export const ItemsInfoFooter = () => {
	const [ isExpanded, setIsExpanded ] = useState(
		() => sessionStorage.getItem(SESSION_KEY) !== 'true',
	);
	
	const handleToggle = () => {
		setIsExpanded((prev) => {
			const next = !prev;
			if (!next) sessionStorage.setItem(SESSION_KEY, 'true');
			else sessionStorage.removeItem(SESSION_KEY);
			return next;
		});
	};
	
	const handleDismiss = () => {
		setIsExpanded(false);
		sessionStorage.setItem(SESSION_KEY, 'true');
	};
	
	return (
		<Box component="aside" sx={{ mt: 4 }}>
			<Box
				component="button"
				onClick={handleToggle}
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					mb: 1,
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					color: '#4B5563',
					fontWeight: 500,
					'&:hover': { color: '#111827' },
				}}
			>
				<TaskerIcon icon="info" size={16}/>
				<span>{baseTexts.toggle}</span>
				<TaskerIcon icon={isExpanded ? 'chevronUp' : 'chevronDown'} size={11}/>
			</Box>
			
			{isExpanded && (
				<Box sx={{
					display: 'flex',
					alignItems: 'flex-start',
					p: 2,
					borderRadius: '8px',
					backgroundColor: '#EEF2FF',
					border: '1px solid #BFDBFE',
					color: '#1E40AF',
				}}>
					<Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1 }}>
						<Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
							{baseTexts.title}
						</Typography>
						<Typography sx={{ fontSize: '0.875rem', opacity: 0.9 }}>
							{baseTexts.body}
						</Typography>
					</Box>
					<IconButton
						onClick={handleDismiss}
						sx={{ color: '#1E40AF', '&:hover': { backgroundColor: '#BFDBFE' } }}
					>
						<TaskerIcon icon="close" size={16}/>
					</IconButton>
				</Box>
			)}
		</Box>
	);
};
