import React from 'react';
import HeroImage from '../assets/hero-img.svg';
import { Link } from 'react-router-dom';

const Hero = () => {
	return (
		<div className='hero-container'>
			<div>
				<h1>
					Better Solutions For Your <br /> Bussiness
				</h1>
				<h3>
					We are team of talented designers making websites with <br />{' '}
					Bootstrap
				</h3>
				<div className='hero-btn'>
					<Link to='/login'>
						<button className='hero-btn1'>Get Started</button>
					</Link>
					<button className='hero-btn2'>Watch Video</button>
				</div>
			</div>
			<img src={HeroImage} alt='Hero' />
		</div>
	);
};

export default Hero;
