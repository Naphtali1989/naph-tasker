import { KeyboardEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { authActions } from 'src/store/actions/auth.actions';
import { authSelectors } from 'src/store/selectors/auth.selectors';
import { lang } from 'src/lang';

const baseTexts = lang.login;

function LoginPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
	const isLoggingIn = useAppSelector(authSelectors.isLoggingIn);
	
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loginError, setLoginError ] = useState<string | null>(null);
	
	useEffect(() => {
		if (isAuthenticated) navigate('/items');
	}, [ isAuthenticated, navigate ]);
	
	const handleSubmit = async () => {
		if (!username || !password) {
			setLoginError(baseTexts.emptyFields);
			return;
		}
		setLoginError(null);
		try {
			await dispatch(authActions.login({ username, password })).unwrap();
		} catch (error) {
			const { status } = error as { status: number };
			setLoginError(status === 401 ? baseTexts.invalidCredentials : baseTexts.serverError);
		}
	};
	
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !isLoggingIn) handleSubmit();
	};
	
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
			<Paper sx={{ p: 4, width: 400 }}>
				<Typography variant="h5" mb={3}>
					{lang.common.appName}
				</Typography>
				<TextField
					label={baseTexts.username}
					value={username}
					onChange={(e) => {
						setLoginError(null);
						setUsername(e.target.value);
					}}
					onKeyDown={handleKeyDown}
					fullWidth
					margin="normal"
					disabled={isLoggingIn}
				/>
				<TextField
					label={baseTexts.password}
					type="password"
					value={password}
					onChange={(e) => {
						setLoginError(null);
						setPassword(e.target.value);
					}}
					onKeyDown={handleKeyDown}
					fullWidth
					margin="normal"
					disabled={isLoggingIn}
				/>
				{loginError && (
					<Alert severity="error" sx={{ mt: 2 }}>
						{loginError}
					</Alert>
				)}
				<Button
					variant="contained"
					fullWidth
					onClick={handleSubmit}
					disabled={isLoggingIn}
					sx={{ mt: 3 }}
				>
					{isLoggingIn ? <CircularProgress size={20} color="inherit"/> : baseTexts.submit}
				</Button>
			</Paper>
		</Box>
	);
}

export default LoginPage;
