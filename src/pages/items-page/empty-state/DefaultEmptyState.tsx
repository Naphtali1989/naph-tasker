import { Box, Button, Typography } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';

const baseTexts = lang.items;

type Props = {
	onAddItem: () => void;
}

export const DefaultEmptyState = ({ onAddItem }: Props) => (
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
				{baseTexts.noItemsYet}
			</Typography>
			<Typography sx={{ fontSize: '0.875rem', color: '#6B7280' }}>
				{baseTexts.noItemsSubtitle}
			</Typography>
		</Box>
		<Button
			onClick={onAddItem}
			startIcon={<TaskerIcon icon="add" size={16} color="white"/>}
			sx={{
				mt: 1,
				color: 'white',
				textTransform: 'none',
				fontWeight: 600,
				px: 1.5,
				background: 'linear-gradient(rgb(99, 102, 241), rgb(79, 70, 229))',
				transition: 'all 150ms ease-out',
				'&:hover': { background: 'linear-gradient(rgb(79, 70, 229), rgb(67, 56, 202))' },
				'&:active': { transform: 'scale(0.98)' },
			}}
		>
			{baseTexts.addFirstItem}
		</Button>
	</Box>
);
