import { Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
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
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon fontSize="small" sx={{ color: 'text.secondary' }}/>
					</InputAdornment>
				),
			}}
		/>
		<Button
			variant="outlined"
			onClick={onAddItem}
			disabled={isAddDisabled}
			startIcon={<AddIcon/>}
			size="small"
		>
			{lang.items.addItem}
		</Button>
	</Box>
);
