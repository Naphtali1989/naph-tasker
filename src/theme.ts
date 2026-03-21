import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#6366F1',
			dark: '#4F46E5',
		},
		background: {
			default: '#F9FAFB',
			paper: '#ffffff',
		},
		text: {
			primary: '#111827',
			secondary: '#4B5563',
		},
		error: {
			main: '#EF4444',
			light: '#FEE2E2',
		},
	},
	typography: {
		fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorDefault: {
					backgroundColor: '#ffffff',
					color: '#111827',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 500,
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					fontSize: '0.875rem',
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: '#E5E7EB',
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: '#D1D5DB',
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: '#6366F1',
						borderWidth: 1,
					},
					boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.04)',
				},
				input: {
					padding: '10px 14px',
					'&::placeholder': {
						color: '#9CA3AF',
						opacity: 1,
					},
				},
			},
		},
	},
});

export default theme;
