import { Priority, Option } from 'src/types';

export const priorityOptions: Option<Priority>[] = [ Priority.P1, Priority.P2, Priority.P3, Priority.P4, Priority.P5 ].map(
	(n) => ({
		id: n,
		label: `P${n}`,
	}));
