import TaskerDropdown from 'src/components/TaskerDropdown';
import type { Status } from 'src/types';
import { statusOptions } from 'src/utils';
import type { CommonCellProps } from './types';

export const StatusCell = ({ row, onFieldSave }: CommonCellProps) => {
	const handleChange = (value: Status) => onFieldSave?.(row.id, 'status', value);

	return (
		<TaskerDropdown
			value={row.status}
			options={statusOptions}
			onChange={handleChange}
		/>
	);
};
