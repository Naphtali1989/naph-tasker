import { Box, Button, TextField, InputAdornment } from '@mui/material';
import { TaskerIcon } from 'src/icons';
import { lang } from 'src/lang';

type Props = {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onAddItem: () => void;
	isAddDisabled: boolean;
}

export const ItemsViewHeader = ({ searchQuery, onSearchChange, onAddItem, isAddDisabled }: Props) => (
	<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
		<TextField
			placeholder={lang.items.searchPlaceholder}
			value={searchQuery}
			onChange={(e) => onSearchChange(e.target.value)}
			size="small"
			sx={{ width: 320 }}
			slotProps={{ input: {
				startAdornment: (
					<InputAdornment position="start">
						<TaskerIcon icon="search" size={18} color="currentColor"/>
					</InputAdornment>
				),
			} }}
		/>
		<Button
			variant="outlined"
			onClick={onAddItem}
			disabled={isAddDisabled}
			startIcon={<TaskerIcon icon="add" size={18}/>}
			size="small"
		>
			{lang.items.addItem}
		</Button>
	</Box>
);
