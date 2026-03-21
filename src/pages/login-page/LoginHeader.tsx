import { Box, Typography } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';

const baseTexts = lang.login;

export const LoginHeader = () => (
	<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
		<Box sx={{
			position: 'relative',
			width: 64,
			height: 64,
			borderRadius: '16px',
			background: 'linear-gradient(145deg, #6366F1 0%, #433BCE 100%)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			mb: 3,
			boxShadow: '0 10px 30px -5px rgba(99,102,241,0.4), 0 4px 12px -2px rgba(99,102,241,0.3)',
		}}>
			<Box sx={{
				position: 'absolute',
				inset: 0,
				borderRadius: '16px',
				background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
			}}/>
			<TaskerIcon icon="clipboard" size={32} color="white"/>
		</Box>
		
		<Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
			{baseTexts.welcome}
		</Typography>
		<Typography sx={{ fontSize: '0.875rem', color: '#4B5563' }}>
			{baseTexts.subtitle}
		</Typography>
	</Box>
);
