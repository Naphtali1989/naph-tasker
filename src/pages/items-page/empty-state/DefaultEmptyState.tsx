import { Box, Button, Typography } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';
import { emptyStateStyles, gradientButtonStyles } from 'src/utils';

const baseTexts = lang.items;

type Props = {
	onAddItem: () => void;
}

export const DefaultEmptyState = ({ onAddItem }: Props) => (
	<Box sx={emptyStateStyles.wrapper}>
		<Box sx={emptyStateStyles.iconBox}>
			<TaskerIcon icon="package" size={32} color="#9CA3AF"/>
		</Box>
		<Box sx={emptyStateStyles.textBox}>
			<Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>
				{baseTexts.noItemsYet}
			</Typography>
			<Typography sx={{ fontSize: '0.875rem', color: '#6B7280' }}>
				{baseTexts.noItemsSubtitle}
			</Typography>
		</Box>
		<Button
			onClick={onAddItem}
			startIcon={<TaskerIcon icon="add" size={16} color="white"/>}
			sx={{ ...gradientButtonStyles.indigo, mt: 1, fontWeight: 600, px: 1.5 }}
		>
			{baseTexts.addFirstItem}
		</Button>
	</Box>
);
