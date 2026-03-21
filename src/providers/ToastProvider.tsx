import { useState, useEffect, useCallback, useRef } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { toast } from 'src/providers/toast/toast';
import type { ToastItem } from 'src/providers/toast/toast';

const TOAST_DURATION = 3000;

export const ToastProvider = () => {
	const [ toasts, setToasts ] = useState<ToastItem[]>([]);
	const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

	const remove = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
		clearTimeout(timeoutsRef.current.get(id));
		timeoutsRef.current.delete(id);
	}, []);

	useEffect(() => {
		toast._register((item) => {
			setToasts((prev) => [ ...prev, item ]);
			const timeoutId = setTimeout(() => remove(item.id), TOAST_DURATION);
			timeoutsRef.current.set(item.id, timeoutId);
		});
		return () => {
			toast._unregister();
			timeoutsRef.current.forEach((id) => clearTimeout(id));
			timeoutsRef.current.clear();
		};
	}, [ remove ]);

	return (
		<>
			{toasts.map((t, index) => (
				<Snackbar
					key={t.id}
					open
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					sx={{ top: `${24 + index * 70}px !important` }}
				>
					<Alert severity={t.severity} variant="filled" onClose={() => remove(t.id)}>
						{t.message}
					</Alert>
				</Snackbar>
			))}
		</>
	);
};
