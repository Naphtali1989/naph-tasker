import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { authActions } from 'src/store/actions/auth.actions';
import { authSelectors } from 'src/store/selectors/auth.selectors';
import { lang } from 'src/lang';

export const AppHeader = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);

	const handleLogout = () => dispatch(authActions.logout());

	return (
		<AppBar position="static">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h6">{lang.common.appName}</Typography>
				{isAuthenticated && (
					<Button color="inherit" onClick={handleLogout}>
						{lang.common.logout}
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};
