export enum Status {
	Open = 'open',
	InProgress = 'in_progress',
	Done = 'done',
}

export enum Priority {
	P1 = 1,
	P2 = 2,
	P3 = 3,
	P4 = 4,
	P5 = 5,
}

export type Option<T extends string | number> = {
	id: T;
	label: string;
};

export type Item = {
	id: string;
	name: string;
	status: Status;
	priority: Priority;
	orderIndex: number;
	updatedAt: number;
}

export type TokenData = {
	accessToken: string;
	sessionToken: string;
	accessExpiresAt: number;
	sessionExpiresAt: number;
}

export type CreateItemPayload = {
	name: string;
	status?: Status;
	priority?: Priority;
}

export type UpdateItemPayload = {
	name?: string;
	status?: Status;
	priority?: Priority;
}
