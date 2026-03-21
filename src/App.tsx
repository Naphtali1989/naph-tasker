import { Box } from '@mui/material';
import AppRouter from 'src/router/AppRouter';
import { ToastProvider } from 'src/providers/ToastProvider';

function App() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<Box sx={{ flex: 1, overflow: 'auto' }}>
				<AppRouter/>
			</Box>
			<ToastProvider/>
		</Box>
	);
}

export default App;
