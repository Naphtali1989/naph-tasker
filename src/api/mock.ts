import { v4 as uuid } from 'uuid';
import { Status, Priority } from 'src/types';
import type {
	Item,
	TokenData,
	CreateItemPayload,
	UpdateItemPayload,
} from 'src/types';

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password123';
const ACCESS_TOKEN_TTL = 30 * 1000;
const SESSION_TOKEN_TTL = 5 * 60 * 1000;
const ITEMS_KEY = 'naph-tasker-items';

let currentSession: TokenData | null = null;

const delay = () => new Promise((res) => setTimeout(res, Math.random() * 400 + 200));

const maybeFail = () => {
	if (Math.random() < 0.15) throw { status: 500, message: 'Server error' };
};

const requireValidToken = () => {
	if (!currentSession || Date.now() > currentSession.accessExpiresAt) {
		throw { status: 401, message: 'Unauthorized' };
	}
};

const simulateRequest = async (requireAuth = true) => {
	await delay();
	maybeFail();
	if (requireAuth) requireValidToken();
};

const readItems = (): Item[] => {
	const raw = localStorage.getItem(ITEMS_KEY);
	return raw ? JSON.parse(raw) : [];
};

const writeItems = (items: Item[]) => {
	localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
};

export const login = async (username: string, password: string): Promise<TokenData> => {
	await simulateRequest(false);
	if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
		throw { status: 401, message: 'Invalid credentials' };
	}
	const now = Date.now();
	currentSession = {
		accessToken: uuid(),
		sessionToken: uuid(),
		accessExpiresAt: now + ACCESS_TOKEN_TTL,
		sessionExpiresAt: now + SESSION_TOKEN_TTL,
	};
	return currentSession;
};

export const refresh = async (sessionToken?: string): Promise<Pick<TokenData, 'accessToken' | 'accessExpiresAt'>> => {
	await delay();
	if (!currentSession || currentSession.sessionToken !== sessionToken || Date.now() > currentSession.sessionExpiresAt) {
		throw { status: 401, message: 'Session expired' };
	}
	currentSession.accessToken = uuid();
	currentSession.accessExpiresAt = Date.now() + ACCESS_TOKEN_TTL;
	return {
		accessToken: currentSession.accessToken,
		accessExpiresAt: currentSession.accessExpiresAt,
	};
};

export const getItems = async (): Promise<Item[]> => {
	await simulateRequest();
	return readItems();
};

export const createItem = async (payload: CreateItemPayload): Promise<Item> => {
	await simulateRequest();
	if (!payload.name || payload.name.length < 2 || payload.name.length > 60) {
		throw { status: 400, message: 'Name must be 2–60 characters' };
	}
	const item: Item = {
		id: uuid(),
		name: payload.name,
		status: payload.status ?? Status.Open,
		priority: payload.priority ?? Priority.P3,
		orderIndex: Date.now(),
		updatedAt: Date.now(),
	};
	const items = readItems();
	writeItems([ ...items, item ]);
	return item;
};

export const updateItem = async (id: string, payload: UpdateItemPayload): Promise<Item> => {
	await simulateRequest();
	const items = readItems();
	const index = items.findIndex((i) => i.id === id);
	if (index === -1) throw { status: 404, message: 'Item not found' };
	items[index] = { ...items[index], ...payload, updatedAt: Date.now() };
	writeItems(items);
	return items[index];
};

export const updateItems = async (ids: string[], payload: UpdateItemPayload): Promise<Item[]> => {
	await simulateRequest();
	const items = readItems();
	const updated: Item[] = [];
	const now = Date.now();
	const result = items.map((item) => {
		if (ids.includes(item.id)) {
			const updatedItem = { ...item, ...payload, updatedAt: now };
			updated.push(updatedItem);
			return updatedItem;
		}
		return item;
	});
	writeItems(result);
	return updated;
};

export const deleteItem = async (id: string): Promise<void> => {
	await simulateRequest();
	writeItems(readItems().filter((item) => item.id !== id));
};

export const deleteItems = async (ids: string[]): Promise<void> => {
	await simulateRequest();
	writeItems(readItems().filter((item) => !ids.includes(item.id)));
};
