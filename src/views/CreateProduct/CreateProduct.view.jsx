import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import FormProduct from '../../components/FormProduct';

const CreateProduct = () => {
	useEffect(() => {
		alert('Welcome');
	}, []);

	return (
		<>
			<Header />
			<Intro />
			<FormProduct />
		</>
	);
};

export default CreateProduct;
