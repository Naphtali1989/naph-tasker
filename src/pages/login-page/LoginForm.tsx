import { KeyboardEvent, useState } from 'react';
import {
	Box,
	TextField,
	Button,
	CircularProgress,
	InputAdornment,
	IconButton,
	FormHelperText,
	FormLabel,
} from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';

const baseTexts = lang.login;

const fieldErrorSx = {
	'& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: '#EF4444' },
	'& .MuiOutlinedInput-root.Mui-error': { backgroundColor: 'rgba(254,226,226,0.3)' },
};

type Props = {
	onLogin: (username: string, password: string) => Promise<string | null>;
	isLoggingIn: boolean;
}

export const LoginForm = ({ onLogin, isLoggingIn }: Props) => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ usernameError, setUsernameError ] = useState<string | null>(null);
	const [ passwordError, setPasswordError ] = useState<string | null>(null);
	const [ loginError, setLoginError ] = useState<string | null>(null);
	const [ showPassword, setShowPassword ] = useState(false);
	
	const handleSubmit = async () => {
		let hasError = false;
		if (!username) {
			setUsernameError(baseTexts.usernameRequired);
			hasError = true;
		}
		if (!password) {
			setPasswordError(baseTexts.passwordRequired);
			hasError = true;
		}
		if (hasError) return;
		
		setLoginError(null);
		const error = await onLogin(username, password);
		if (error) setLoginError(error);
	};
	
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !isLoggingIn) handleSubmit();
	};
	
	const handleUsernameChange = (value: string) => {
		setUsernameError(null);
		setLoginError(null);
		setUsername(value);
	};
	
	const handlePasswordChange = (value: string) => {
		setPasswordError(null);
		setLoginError(null);
		setPassword(value);
	};
	
	const handleTogglePassword = () => setShowPassword((prev) => !prev);
	const labelStyles = { fontSize: '0.875rem', fontWeight: 500, color: '#111827', mb: 1, display: 'block' };
	const formHelperStyles = { fontSize: '0.75rem', mt: 0.5 };
	
	return (
		<Box component="form" noValidate>
			<Box mb={3}>
				<FormLabel sx={labelStyles}>
					{baseTexts.username}
				</FormLabel>
				<TextField
					placeholder={baseTexts.usernamePlaceholder}
					value={username}
					onChange={(e) => handleUsernameChange(e.target.value)}
					onKeyDown={handleKeyDown}
					fullWidth
					size="small"
					disabled={isLoggingIn}
					error={!!usernameError}
					sx={fieldErrorSx}
				/>
				{usernameError && (
					<FormHelperText error sx={formHelperStyles}>{usernameError}</FormHelperText>
				)}
			</Box>
			
			<Box mb={3}>
				<FormLabel sx={labelStyles}>
					{baseTexts.password}
				</FormLabel>
				<TextField
					placeholder={baseTexts.passwordPlaceholder}
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={(e) => handlePasswordChange(e.target.value)}
					onKeyDown={handleKeyDown}
					fullWidth
					size="small"
					disabled={isLoggingIn}
					error={!!passwordError || !!loginError}
					sx={fieldErrorSx}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton size="small" onClick={handleTogglePassword} edge="end" tabIndex={-1}>
										{showPassword
											? <TaskerIcon icon="eye" size={16} color="#9CA3AF"/>
											: <TaskerIcon icon="eyeOff" size={16} color="#9CA3AF"/>
										}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>
				{(passwordError || loginError) && (
					<FormHelperText error sx={formHelperStyles}>{passwordError ?? loginError}</FormHelperText>
				)}
			</Box>
			
			<Button
				variant="contained"
				fullWidth
				onClick={handleSubmit}
				disabled={isLoggingIn}
				sx={{
					fontSize: '1rem',
					background: 'linear-gradient(180deg, #6366F1 0%, #4F46E5 100%)',
					border: '1px solid #4F46E5',
					'&:active': {
						transform: 'translateY(0)',
						boxShadow: '0 1px 2px rgba(99,102,241,0.2), inset 0 1px 3px rgba(0,0,0,0.1)',
					},
					'&.Mui-disabled': {
						opacity: 0.5,
						color: 'white',
					},
				}}
			>
				{isLoggingIn
					? <><CircularProgress size={20} color="inherit" sx={{ mr: 1 }}/> {baseTexts.signingIn}</>
					: baseTexts.submit
				}
			</Button>
		</Box>
	);
};
