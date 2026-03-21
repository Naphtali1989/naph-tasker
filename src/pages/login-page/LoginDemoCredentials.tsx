import { Box, Typography } from '@mui/material';
import { lang } from 'src/lang';

const baseTexts = lang.login;

export const LoginDemoCredentials = () => (
	<Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(229,231,235,0.5)' }}>
		<Box sx={{
			overflow: 'hidden',
			p: 2,
			borderRadius: '12px',
			color: '#4F46E5',
			backgroundColor: '#EEF2FF',
			border: '1px solid rgba(99,102,241,0.12)',
			textAlign: 'center',
		}}>
			<Typography sx={{
				fontSize: '0.75rem',
				textTransform: 'uppercase',
				mb: 1,
			}}>
				{baseTexts.demoCredentials}
			</Typography>
			<Typography sx={{
				fontSize: '0.875rem',
				fontFamily: 'monospace',
			}}>
				{baseTexts.demoCredentialsValue}
			</Typography>
		</Box>
	</Box>
);
