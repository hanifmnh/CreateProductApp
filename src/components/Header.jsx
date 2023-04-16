import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
	// get toke existing
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	// handle logout process
	const handleLogout = () => {
		if (token) {
			//remove token from localStorage
			localStorage.removeItem('token');

			// redirect to login page
			navigate('/login');
		}
	};

	return (
		<Navbar className='shadow-sm py-0' expand='lg'>
			<Container className='container-fluid'>
				<Navbar.Brand href='#' className='text-dark fw-semibold'>
					Simple Header
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto align-items-center'>
						<Link to='/'>
							<Button variant='primary' className='me-2 my-2'>
								Home
							</Button>
						</Link>
						<Nav.Link href='#' className='text-primary'>
							Features
						</Nav.Link>
						<Nav.Link href='#' className='text-primary'>
							Pricing
						</Nav.Link>
						<Nav.Link href='#' className='text-primary'>
							FAQs
						</Nav.Link>
						<Nav.Link href='#' className='text-primary'>
							About
						</Nav.Link>
						{token ? (
							<Nav.Link>
								<Button variant='danger' onClick={handleLogout}>
									Logout
								</Button>
							</Nav.Link>
						) : (
							<Link to='/login'>
								<Button variant='success' className='ms-2 my-2'>
									Login
								</Button>
							</Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
