import { Button, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from 'src/store/hooks';
import { itemsActions } from 'src/store/actions/items.actions';
import { Status } from 'src/types';
import { toast } from 'src/providers/toast/toast';
import { lang } from 'src/lang';

type Props = {
	selectedIds: string[];
	onClearSelection: () => void;
}

export const ItemsTableFooter = ({ selectedIds, onClearSelection }: Props) => {
	const dispatch = useAppDispatch();
	
	const handleBulkMarkDone = async () => {
		const ids = selectedIds;
		onClearSelection();
		const success = await dispatch(itemsActions.updateItems({ ids, payload: { status: Status.Done } }));
		if (!success) toast.error(lang.toasts.updateItemsFailed);
	};
	
	const handleBulkDelete = async () => {
		const ids = selectedIds;
		onClearSelection();
		const success = await dispatch(itemsActions.deleteItems(ids));
		if (success) toast.success(lang.toasts.itemsDeleted(ids.length));
		else toast.error(lang.toasts.deleteItemsFailed);
	};
	
	return (
		<Toolbar sx={{ gap: 2, mt: 1 }}>
			<Typography>{lang.items.selectedCount(selectedIds.length)}</Typography>
			<Button variant="outlined" color="success" onClick={handleBulkMarkDone}>
				{lang.items.markDone}
			</Button>
			<Button variant="outlined" color="error" onClick={handleBulkDelete}>
				{lang.items.deleteSelected}
			</Button>
		</Toolbar>
	);
};
