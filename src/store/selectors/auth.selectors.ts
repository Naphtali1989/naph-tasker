import type { RootState } from 'src/store'

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectIsLoggingIn = (state: RootState) => state.auth.isLoggingIn
export const selectAuthError = (state: RootState) => state.auth.error

export const authSelectors = {
	isAuthenticated: selectIsAuthenticated,
	isLoggingIn: selectIsLoggingIn,
	error: selectAuthError,
}
