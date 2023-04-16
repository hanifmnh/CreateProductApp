import React from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import ProductList from '../../components/ProductList';
import JoinNewsletter from '../../components/JoinNewsletter';
import ProfileLandingPage from '../../components/ProfileLandingPage';
import Footer from '../../components/Footer';
import '../../styles/LandingPage.css';

const LandingPage = () => {
	return (
		<>
			<Header />
			<Hero />
			<ProductList />
			<JoinNewsletter />
			<ProfileLandingPage />
			<Footer />
		</>
	);
};

export default LandingPage;
