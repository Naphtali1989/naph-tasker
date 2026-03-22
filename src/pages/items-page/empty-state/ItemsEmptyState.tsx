import { DefaultEmptyState } from './DefaultEmptyState';
import { SearchEmptyState } from './SearchEmptyState';

export type ItemsEmptyStateProps = {
	hasActiveSearch: boolean;
	onAddItem: () => void;
}

export const ItemsEmptyState = ({ hasActiveSearch, onAddItem }: ItemsEmptyStateProps) => {
	return (
		hasActiveSearch
			? <SearchEmptyState/>
			: <DefaultEmptyState onAddItem={onAddItem}/>
	);
};
