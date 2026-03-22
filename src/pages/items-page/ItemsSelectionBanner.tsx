import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useAppDispatch } from 'src/store/hooks';
import { itemsActions } from 'src/store/actions/items.actions';
import { Status } from 'src/types';
import { statusOptions, gradientButtonStyles } from 'src/utils';
import { TaskerIcon } from 'src/icons';
import { toast } from 'src/providers/toast/toast';
import { lang } from 'src/lang';
import TaskerDropdown from 'src/components/TaskerDropdown.tsx';

const baseTexts = lang.items;

type Props = {
	rowCount: number;
	hasFilter: boolean;
	selectedIds: string[];
	onClearSelection: () => void;
}

export const ItemsSelectionBanner = ({ rowCount, hasFilter, selectedIds, onClearSelection }: Props) => {
	const dispatch = useAppDispatch();
	const [ selectedStatus, setSelectedStatus ] = useState<Status>(Status.Done);
	const [ isUpdating, setIsUpdating ] = useState(false);
	const [ isDeleting, setIsDeleting ] = useState(false);

	const handleUpdate = async () => {
		const ids = selectedIds;
		setIsUpdating(true);
		onClearSelection();
		const success = await dispatch(itemsActions.updateItems({ ids, payload: { status: selectedStatus } }));
		setIsUpdating(false);
		if (!success) toast.error(lang.toasts.updateItemsFailed);
	};

	const handleDelete = async () => {
		const ids = selectedIds;
		setIsDeleting(true);
		onClearSelection();
		const success = await dispatch(itemsActions.deleteItems(ids));
		setIsDeleting(false);
		if (success) toast.success(lang.toasts.itemsDeleted(ids.length));
		else toast.error(lang.toasts.deleteItemsFailed);
	};

	const isBusy = isUpdating || isDeleting;
	const hasSelection = selectedIds.length > 0;

	return (
		<Box
			role="toolbar"
			aria-label="Table actions"
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				px: 2,
				height: '68px',
				borderRadius: '12px',
				backgroundColor: 'white',
				border: '1px solid rgba(229, 231, 235, 0.5)',
				boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05)',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
				{hasSelection ? (
					<>
						<Box sx={{
							px: 1.5,
							py: 0.75,
							borderRadius: '9999px',
							backgroundColor: '#6366F1',
							color: 'white',
							fontSize: '0.875rem',
							fontWeight: 600,
						}}>
							{baseTexts.selectedCount(selectedIds.length)}
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5, borderRadius: '8px', backgroundColor: '#F3F4F6' }}>
							<TaskerDropdown
								value={selectedStatus}
								options={statusOptions}
								onChange={setSelectedStatus}
								selectSx={{ fontWeight: 500, fontSize: '0.8rem', '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
							/>

							<Button
								size="small"
								disabled={isBusy}
								onClick={handleUpdate}
								startIcon={<TaskerIcon icon={isUpdating ? 'checkCircle' : 'save'} size={14}/>}
								sx={{ ...gradientButtonStyles.indigo, fontSize: '0.75rem', px: 1.5, py: '5px', borderRadius: '8px' }}
							>
								{baseTexts.updateSelected}
							</Button>
						</Box>

						<Button
							disabled={isBusy}
							onClick={handleDelete}
							startIcon={<TaskerIcon icon="trash" size={14}/>}
							sx={{ ...gradientButtonStyles.danger, fontSize: '0.75rem', px: 1.5, py: '5px', minHeight: 28, borderRadius: '8px' }}
						>
							{baseTexts.deleteSelected}
						</Button>
					</>
				) : (
					<Box sx={{
						px: 1.5,
						py: 0.5,
						borderRadius: '9999px',
						backgroundColor: '#F3F4F6',
						color: '#6B7280',
						fontSize: '0.8125rem',
						fontWeight: 500,
					}}>
						{hasFilter ? baseTexts.itemsFound(rowCount) : baseTexts.itemsCount(rowCount)}
					</Box>
				)}
			</Box>
		</Box>
	);
};
