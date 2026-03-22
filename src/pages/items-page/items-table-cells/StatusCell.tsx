import TaskerDropdown from 'src/components/TaskerDropdown';
import { Status } from 'src/types';
import { statusOptions, dropdownPillStyles } from 'src/utils';
import type { CommonCellProps } from './types';

const statusColorMap: Record<Status, { bg: string; color: string; border?: string }> = {
	[Status.Open]: { bg: 'transparent', color: '#64748b', border: '1px solid #cbd5e1' },
	[Status.InProgress]: { bg: '#ede9fe', color: '#7c3aed' },
	[Status.Done]: { bg: '#dcfce7', color: '#16a34a' },
};

export const StatusCell = ({ row, onFieldSave }: CommonCellProps) => {
	const handleChange = (value: Status) => onFieldSave?.(row.id, 'status', value);
	const { bg, color, border } = statusColorMap[row.status] ?? statusColorMap[Status.Open];

	return (
		<TaskerDropdown
			value={row.status}
			options={statusOptions}
			onChange={handleChange}
			selectSx={{
				...dropdownPillStyles,
				backgroundColor: bg,
				color: color,
				border: border ?? 'none',
				'& .MuiSelect-icon': { color: color },
			}}
		/>
	);
};
