import React from 'react';

const JoinNewsletter = () => {
	return (
		<div className='join-newsletter'>
			<div>
				<h3>Join Our Newsletter</h3>
				<p>
					Tamen quem nulla quae legam multos aute sint culpa legam noster magna
				</p>
				<div className='input-email-newsletter'>
					<form action=''>
						<input type='email' id='email' />
						<input type='submit' defaultValue='Subscribe' />
					</form>
				</div>
			</div>
		</div>
	);
};

export default JoinNewsletter;
