import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage.view';
import CreateProduct from './views/CreateProduct/CreateProduct.view';
import { Provider } from 'react-redux';
import store from './config/redux/store';
import PrivateRoute from './config/routes/PrivateRoute';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './config/apollo';

const App = () => {
	return (
		<ApolloProvider client={apolloClient}>
			<Provider store={store}>
				<Router>
					<Routes>
						<Route exact path='/' element={<LandingPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route element={<PrivateRoute />}>
							<Route path='/create-product' element={<CreateProduct />} />
						</Route>
					</Routes>
				</Router>
			</Provider>
		</ApolloProvider>
	);
};

export default App;
