import React from 'react';
import { Button } from 'react-bootstrap';

const RandomNumber = () => {
	const handleClick = (e) => {
		e.preventDefault();

		const randomNumber = Math.floor(Math.random() * 100);
		console.log('Random Number:', randomNumber);
	};

	return (
		<div className='d-grid mx-3' style={{ marginTop: '50px' }}>
			<Button variant='primary' type='submit' onClick={handleClick}>
				Random Number
			</Button>
		</div>
	);
};

export default RandomNumber;
