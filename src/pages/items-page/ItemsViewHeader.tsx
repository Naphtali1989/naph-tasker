import { Box, Button, TextField } from '@mui/material';
import { lang } from 'src/lang';

type Props = {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onAddItem: () => void;
	isAddDisabled: boolean;
}

export const ItemsViewHeader = ({ searchQuery, onSearchChange, onAddItem, isAddDisabled }: Props) => (
	<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
		<Button variant="contained" onClick={onAddItem} disabled={isAddDisabled}>
			{lang.items.addItem}
		</Button>
		<TextField
			placeholder={lang.items.searchPlaceholder}
			value={searchQuery}
			onChange={(e) => onSearchChange(e.target.value)}
			size="small"
		/>
	</Box>
);
