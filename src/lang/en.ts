export const en = {
	common: {
		appName: 'Naph Tasker',
		logout: 'Logout',
	},
	login: {
		username: 'Username',
		password: 'Password',
		submit: 'Login',
		emptyFields: 'Please enter your username and password',
		invalidCredentials: 'Incorrect username or password',
		serverError: 'Something went wrong, please try again',
	},
	items: {
		searchPlaceholder: 'Search by name...',
		addItem: 'Add Item',
		selectedCount: (count: number) => `${count} selected`,
		markDone: 'Mark Done',
		deleteSelected: 'Delete Selected',
	},
	columns: {
		name: 'Name',
		status: 'Status',
		priority: 'Priority',
		updatedAt: 'Updated',
	},
	status: {
		open: 'Open',
		inProgress: 'In Progress',
		done: 'Done',
	},
	validation: {
		nameTooShort: 'Min 2 characters',
		nameTooLong: 'Max 60 characters',
	},
	toasts: {
		fetchItemsFailed: 'Failed to load items',
		itemCreated: 'Item created',
		createItemFailed: 'Failed to create item',
		saveFailed: 'Failed to save changes — item restored',
		itemDeleted: 'Item deleted',
		deleteItemFailed: 'Failed to delete item — restored',
		itemsDeleted: (count: number) => `Deleted ${count} item${count !== 1 ? 's' : ''}`,
		deleteItemsFailed: 'Failed to delete items',
		updateItemsFailed: 'Failed to update items — changes reverted',
	},
};
