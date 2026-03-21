import { Select, MenuItem, Box } from '@mui/material';
import type { SelectChangeEvent, SxProps, Theme } from '@mui/material';
import type { Option } from 'src/types';

type Props<T extends string | number> = {
	value: T;
	options: Option<T>[];
	onChange: (value: T) => void;
	readOnly?: boolean;
	selectSx?: SxProps<Theme>;
}

function TaskerDropdown<T extends string | number>({ value, options, onChange, readOnly = false, selectSx }: Props<T>) {
	const currentLabel = options.find((o) => o.id === value)?.label ?? String(value);
	
	const handleChange = (event: SelectChangeEvent<T>) => {
		onChange(event.target.value as T);
	};
	
	if (readOnly) {
		return (
			<Box sx={{ px: 1, py: 0.5, borderRadius: 1, cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}>
				{currentLabel}
			</Box>
		);
	}
	
	return (
		<Select value={value} onChange={handleChange} size="small" variant="outlined" sx={selectSx}>
			{options.map((option) => (
				<MenuItem key={option.id} value={option.id}>
					{option.label}
				</MenuItem>
			))}
		</Select>
	);
}

export default TaskerDropdown;
