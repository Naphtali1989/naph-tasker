export type AuthState = {
	isAuthenticated: boolean;
	isLoggingIn: boolean;
	error: string | null;
}

export const initialAuthState: AuthState = {
	isAuthenticated: false,
	isLoggingIn: false,
	error: null,
};
