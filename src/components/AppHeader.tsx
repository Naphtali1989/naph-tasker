import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AppIcon, TaskerIcon } from 'src/icons';
import { useAppDispatch } from 'src/store/hooks';
import { authActions } from 'src/store/actions/auth.actions';
import { lang } from 'src/lang';

export const AppHeader = () => {
	const dispatch = useAppDispatch();
	
	const handleLogout = () => dispatch(authActions.logout());
	
	return (
		<AppBar
			position="sticky"
			elevation={0}
			sx={{
				display: 'flex',
				alignItems: 'center',
				backgroundColor: '#FFFFFF85',
				borderBottom: '1px solid rgba(229,231,235,0.4)',
				boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
			}}
		>
			<Toolbar
				sx={{ justifyContent: 'space-between', width: '100%', maxWidth: 1200, minHeight: 64, px: { xs: 2, sm: 3 } }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
					<AppIcon/>
					<Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#4F46E5' }}>
						{lang.common.appName}
					</Typography>
				</Box>
				
				<Button
					size="small"
					onClick={handleLogout}
					startIcon={<TaskerIcon icon="logout" size={16}/>}
					sx={{
						color: '#4B5563',
						backgroundColor: 'white',
						border: '1px solid #E5E7EB',
						px: 1.5,
						minHeight: 28,
						background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
						boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
						'&:hover': {
							background: 'linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)',
						},
					}}
				>
					{lang.common.logout}
				</Button>
			</Toolbar>
		</AppBar>
	);
};
