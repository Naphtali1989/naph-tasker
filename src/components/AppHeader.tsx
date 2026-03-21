import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from 'src/store/hooks';
import { authActions } from 'src/store/actions/auth.actions';
import { lang } from 'src/lang';

export const AppHeader = () => {
	const dispatch = useAppDispatch();

	const handleLogout = () => dispatch(authActions.logout());

	return (
		<AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
			<Toolbar sx={{ justifyContent: 'space-between', minHeight: 52 }}>
				<Typography variant="h6" fontWeight={700}>{lang.common.appName}</Typography>
				<Button variant="text" size="small" color="inherit" onClick={handleLogout} startIcon={<LogoutIcon/>}>
					{lang.common.logout}
				</Button>
			</Toolbar>
		</AppBar>
	);
};
