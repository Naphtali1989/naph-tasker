import { nanoid } from '@reduxjs/toolkit';

export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

export type ToastItem = {
	id: string;
	message: string;
	severity: ToastSeverity;
};

type AddFn = (item: ToastItem) => void;

let _add: AddFn | null = null;

export const toast = {
	_register: (fn: AddFn) => { _add = fn; },
	_unregister: () => { _add = null; },
	success: (message: string) => _add?.({ id: nanoid(), message, severity: 'success' }),
	error: (message: string) => _add?.({ id: nanoid(), message, severity: 'error' }),
	info: (message: string) => _add?.({ id: nanoid(), message, severity: 'info' }),
	warning: (message: string) => _add?.({ id: nanoid(), message, severity: 'warning' }),
};
