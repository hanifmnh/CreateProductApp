import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import bootstrapLogo from '../assets/Bootstrap_logo.svg';

const Intro = () => {
	const article = {
		title: {
			id: 'Buat Akun',
			en: 'Create Account',
		},
		description: {
			id: 'Di bawah ini adalah contoh formulir yang dibuat seluruhnya dengan kontrol formulir Bootstrap. Setiap grup formulir yang diperlukan memiliki status validasi yang dapat dipicu dengan mencoba mengirimkan formulir tanpa menyelesaikannya.',
			en: 'Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.',
		},
	};

	return (
		<Container className='text-center mt-5'>
			<Image
				src={bootstrapLogo}
				alt='Bootstrap Logo'
				style={{ height: '57px', width: '72px' }}
			/>
			<Row className='mt-4'>
				<Col>
					<h2>{article.title.en}</h2>
					<div>{article.description.en}</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Intro;
