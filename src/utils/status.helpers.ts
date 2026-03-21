import { Status, Option } from 'src/types';
import { lang } from 'src/lang';

export const statusOptions: Option<Status>[] = [
	{ id: Status.Open, label: lang.status.open },
	{ id: Status.InProgress, label: lang.status.inProgress },
	{ id: Status.Done, label: lang.status.done },
];
