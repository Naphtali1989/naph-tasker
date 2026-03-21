import TaskerDropdown from 'src/components/TaskerDropdown';
import { Status } from 'src/types';
import { statusOptions } from 'src/utils';
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
				borderRadius: '999px',
				backgroundColor: bg,
				color: color,
				fontWeight: 500,
				fontSize: '0.8rem',
				border: border ?? 'none',
				'& .MuiOutlinedInput-notchedOutline': { border: 'none' },
				'& .MuiSelect-icon': { color: color },
				'& .MuiSelect-select': { py: '4px', px: '12px' },
			}}
		/>
	);
};
