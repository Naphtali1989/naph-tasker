import TaskerDropdown from 'src/components/TaskerDropdown';
import { Priority } from 'src/types';
import { priorityOptions, dropdownPillStyles } from 'src/utils';
import type { CommonCellProps } from './types';

const priorityColorMap: Record<Priority, { bg: string; color: string }> = {
	[Priority.P1]: { bg: '#fee2e2', color: '#dc2626' },
	[Priority.P2]: { bg: '#ffedd5', color: '#ea580c' },
	[Priority.P3]: { bg: '#fef9c3', color: '#ca8a04' },
	[Priority.P4]: { bg: '#dbeafe', color: '#2563eb' },
	[Priority.P5]: { bg: '#f1f5f9', color: '#64748b' },
};

export const PriorityCell = ({ row, onFieldSave }: CommonCellProps) => {
	const handleChange = (value: Priority) => onFieldSave?.(row.id, 'priority', value);
	const { bg, color } = priorityColorMap[row.priority] ?? priorityColorMap[Priority.P5];

	return (
		<TaskerDropdown
			value={row.priority}
			options={priorityOptions}
			onChange={handleChange}
			selectSx={{
				...dropdownPillStyles,
				backgroundColor: bg,
				color: color,
				'& .MuiSelect-icon': { color: color },
			}}
		/>
	);
};
