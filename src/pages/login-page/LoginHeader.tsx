import { Box, Typography } from '@mui/material';
import { AppIcon } from 'src/icons';
import { lang } from 'src/lang';

const baseTexts = lang.login;

export const LoginHeader = () => (
	<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
		<AppIcon size={32}/>
		
		<Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
			{baseTexts.welcome}
		</Typography>
		<Typography sx={{ fontSize: '0.875rem', color: '#4B5563' }}>
			{baseTexts.subtitle}
		</Typography>
	</Box>
);
