/**
 * Shared MUI sx style objects used across multiple components.
 */

export const formLabelStyles = {
	fontSize: '0.875rem',
	fontWeight: 500,
	color: '#111827',
	mb: 1,
	display: 'block',
} as const;

export const formHelperStyles = {
	fontSize: '0.75rem',
	mt: 0.5,
} as const;

export const gradientButtonStyles = {
	indigo: {
		color: 'white',
		textTransform: 'none' as const,
		background: 'linear-gradient(rgb(99, 102, 241), rgb(79, 70, 229))',
		border: '1px solid rgb(79, 70, 229)',
		boxShadow: '0 1px 2px rgba(99,102,241,0.2), 0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
		transition: 'all 150ms ease-out',
		'&:hover': { transform: 'translateY(-1px)', background: 'linear-gradient(rgb(79, 70, 229), rgb(67, 56, 202))' },
		'&:active': { transform: 'scale(0.98)' },
		'&.Mui-disabled': {
			color: 'rgba(255,255,255,0.6)',
			background: 'linear-gradient(rgb(99, 102, 241), rgb(79, 70, 229))',
		},
	},
	danger: {
		color: 'white',
		textTransform: 'none' as const,
		background: 'linear-gradient(rgb(239, 68, 68), rgb(220, 38, 38))',
		border: '1px solid rgb(220, 38, 38)',
		boxShadow: '0 1px 2px rgba(239,68,68,0.2), 0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
		transition: 'all 150ms ease-out',
		'&:hover': { transform: 'translateY(-1px)', background: 'linear-gradient(rgb(220, 38, 38), rgb(185, 28, 28))' },
		'&:active': { transform: 'scale(0.98)' },
		'&.Mui-disabled': {
			color: 'rgba(255,255,255,0.6)',
			background: 'linear-gradient(rgb(239, 68, 68), rgb(220, 38, 38))',
		},
	},
} as const;

export const checkboxStyles = {
	color: '#E5E7EB',
	'&.Mui-checked, &.MuiCheckbox-indeterminate': { color: '#6366F1' },
	'& .MuiSvgIcon-root': { fontSize: 18 },
} as const;

export const dropdownPillStyles = {
	borderRadius: '999px',
	fontWeight: 500,
	fontSize: '0.8rem',
	'& .MuiOutlinedInput-notchedOutline': { border: 'none' },
	'& .MuiSelect-select': { py: '4px', px: '12px' },
} as const;

export const emptyStateStyles = {
	wrapper: {
		display: 'flex',
		flexDirection: 'column' as const,
		alignItems: 'center',
		gap: 2,
		py: 8,
	},
	iconBox: {
		width: 64,
		height: 64,
		borderRadius: '16px',
		backgroundColor: '#F3F4F6',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textBox: {
		display: 'flex',
		flexDirection: 'column' as const,
		alignItems: 'center',
		gap: 0.5,
	},
} as const;
