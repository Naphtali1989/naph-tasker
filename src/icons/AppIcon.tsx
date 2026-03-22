import { Box } from '@mui/material';
import { TaskerIcon } from 'src/icons/index.ts';

export const AppIcon = ({ size = 20 }: { size?: number }) => {
	return (
		<Box sx={{
			position: 'relative',
			width: 40,
			height: 40,
			borderRadius: '12px',
			background: 'linear-gradient(145deg, #6366F1 0%, #433BCE 100%)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			boxShadow: '0 2px 8px -2px rgba(99,102,241,0.4)',
		}}>
			<Box sx={{
				position: 'absolute',
				inset: 0,
				borderRadius: '12px',
				background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
				pointerEvents: 'none',
			}}/>
			<TaskerIcon icon="clipboard" size={size} color="white" style={{ position: 'relative' }}/>
		</Box>
	);
};
