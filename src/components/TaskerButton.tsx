import { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';

type Props = {
	label: string;
	onConfirm: () => void;
	loading?: boolean;
	color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
}

function TaskerButton({label, onConfirm, loading = false, color = 'primary'}: Props) {
	const [confirming, setConfirming] = useState(false);
	
	useEffect(() => {
		if (!confirming) return;
		const timer = setTimeout(() => setConfirming(false), 3000);
		return () => clearTimeout(timer);
	}, [confirming]);
	
	const handleClick = () => {
		if (confirming) {
			onConfirm();
			setConfirming(false);
		} else {
			setConfirming(true);
		}
	};
	
	return (
		<Button
			variant="contained"
			color={ confirming ? 'error' : color }
			onClick={ handleClick }
			disabled={ loading }
			size="small"
		>
			{ loading
				? <CircularProgress size={ 16 } color="inherit"/>
				: confirming ? 'Confirm?' : label
			}
		</Button>
	);
}

export default TaskerButton;
