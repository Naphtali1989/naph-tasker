import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';
import { authSelectors } from 'src/store/selectors/auth.selectors';
import { LoginPage, ItemsPage } from 'src/pages';

function ProtectedRoute() {
	const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
	return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>;
}

const router = createBrowserRouter(
	[
		{
			path: '/login',
			element: <LoginPage/>,
		},
		{
			element: <ProtectedRoute/>,
			children: [
				{
					path: '/items',
					element: <ItemsPage/>,
				},
			],
		},
		{
			path: '*',
			element: <Navigate to="/items" replace/>,
		},
	]);

function AppRouter() {
	return <RouterProvider router={router}/>;
}

export default AppRouter;
