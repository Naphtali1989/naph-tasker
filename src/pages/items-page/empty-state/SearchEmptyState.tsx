import { Box, Typography } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';
import { emptyStateStyles } from 'src/utils';

const baseTexts = lang.items;

export const SearchEmptyState = () => (
	<Box sx={emptyStateStyles.wrapper}>
		<Box sx={emptyStateStyles.iconBox}>
			<TaskerIcon icon="package" size={32} color="#9CA3AF"/>
		</Box>
		<Box sx={emptyStateStyles.textBox}>
			<Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>
				{baseTexts.noMatchesFound}
			</Typography>
			<Typography sx={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
				{baseTexts.noMatchesSubtitle}
			</Typography>
		</Box>
	</Box>
);
