import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { authActions } from 'src/store/actions/auth.actions';
import { authSelectors } from 'src/store/selectors/auth.selectors';
import { lang } from 'src/lang';
import { LoginHeader, LoginForm, LoginDemoCredentials } from 'src/pages/login-page';

const baseTexts = lang.login;

function LoginPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
	const isLoggingIn = useAppSelector(authSelectors.isLoggingIn);
	
	useEffect(() => {
		if (isAuthenticated) navigate('/items');
	}, [ isAuthenticated, navigate ]);
	
	const handleLogin = async (username: string, password: string): Promise<string | null> => {
		try {
			await dispatch(authActions.login({ username, password })).unwrap();
			return null;
		} catch (error) {
			const { status } = error as { status: number };
			return status === 401 ? baseTexts.invalidCredentials : baseTexts.serverError;
		}
	};
	
	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: '100%',
			background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)',
		}}>
			<Paper elevation={2} sx={{
				p: { xs: 4, sm: 5 },
				width: '100%',
				maxWidth: 448,
			}}>
				<LoginHeader/>
				<LoginForm onLogin={handleLogin} isLoggingIn={isLoggingIn}/>
				<LoginDemoCredentials/>
			</Paper>
		</Box>
	);
}

export default LoginPage;
