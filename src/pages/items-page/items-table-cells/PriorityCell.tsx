import TaskerDropdown from 'src/components/TaskerDropdown';
import type { Priority } from 'src/types';
import { priorityOptions } from 'src/utils';
import type { CommonCellProps } from './types';

export const PriorityCell = ({ row, onFieldSave }: CommonCellProps) => {
	const handleChange = (value: Priority) => onFieldSave?.(row.id, 'priority', value);

	return (
		<TaskerDropdown
			value={row.priority}
			options={priorityOptions}
			onChange={handleChange}
		/>
	);
};
