import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#5c6bc0',
		},
		background: {
			default: '#f0f2f5',
			paper: '#ffffff',
		},
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorDefault: {
					backgroundColor: '#ffffff',
					color: 'rgba(0, 0, 0, 0.87)',
				},
			},
		},
	},
});

export default theme;
