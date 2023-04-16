import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	let user;

	// get token dari local storage
	const token = localStorage.getItem('token');
	console.log(token);

	// check token dari local storage
	token ? (user = true) : (user = false);

	if (!user) {
		return <Navigate to={'/login'} replace />;
	} else {
		return <Outlet />;
	}
};

export default PrivateRoute;
