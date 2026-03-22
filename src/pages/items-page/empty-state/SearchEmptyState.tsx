import { Box, Typography } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';

const baseTexts = lang.items;

export const SearchEmptyState = () => (
	<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 8 }}>
		<Box sx={{
			width: 64,
			height: 64,
			borderRadius: '16px',
			backgroundColor: '#F3F4F6',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			<TaskerIcon icon="package" size={32} color="#9CA3AF"/>
		</Box>
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
			<Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>
				{baseTexts.noMatchesFound}
			</Typography>
			<Typography sx={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
				{baseTexts.noMatchesSubtitle}
			</Typography>
		</Box>
	</Box>
);
