import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { itemsActions } from 'src/store/actions/items.actions';
import { itemsSelectors } from 'src/store/selectors/items.selectors';
import { authSelectors } from 'src/store/selectors/auth.selectors';
import { useSaveItem } from 'src/hooks/use-save-item';
import { ItemsViewHeader, ItemsTable, ItemsInfoFooter } from 'src/pages/items-page';
import { toast } from 'src/providers/toast/toast';
import { lang } from 'src/lang';

function ItemsPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
	const items = useAppSelector(itemsSelectors.selectAll);
	const isFetching = useAppSelector(itemsSelectors.isFetching);
	const savingIds = useAppSelector(itemsSelectors.savingIds);
	
	const [ searchQuery, setSearchQuery ] = useState('');
	
	const filteredItems = useMemo(
		() => items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
		[ items, searchQuery ],
	);
	
	const {
		rows,
		sampleItem,
		handleFieldChange,
		handleSave,
		handleFieldSave,
		handleAddItem,
		handleDelete,
	} = useSaveItem(filteredItems);
	
	useEffect(() => {
		if (!isAuthenticated) navigate('/login');
	}, [ isAuthenticated, navigate ]);
	
	useEffect(() => {
		let cancelled = false;
		dispatch(itemsActions.fetchItems()).then((success) => {
			if (!cancelled && !success) toast.error(lang.toasts.fetchItemsFailed);
		});
		return () => {
			cancelled = true;
		};
	}, [ dispatch ]);
	
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3, maxWidth: 1200, mx: 'auto', width: '100%' }}>
			<ItemsViewHeader
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				onAddItem={handleAddItem}
				isAddDisabled={sampleItem !== null}
			/>
			<ItemsTable
				rows={rows}
				isFetching={isFetching}
				savingIds={savingIds}
				onFieldChange={handleFieldChange}
				onFieldSave={handleFieldSave}
				onSave={handleSave}
				onDelete={handleDelete}
			/>
			<ItemsInfoFooter/>
		</Box>
	);
}

export default ItemsPage;
