import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginPage.css';
import Header from '../../components/Header';

function LoginPage() {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const [errorMessage, setErrorMessage] = useState('');

	const onLogin = () => {
		const url = 'https://reqres.in/api/login';

		axios
			.post(url, user)
			.then((res) => {
				const token = res.data.token;
				localStorage.setItem('token', token);
				navigate('/create-product');
			})
			.catch((err) => {
				setErrorMessage(
					'Invalid username or password' +
						<br /> +
						'(hint: "email": "eve.holt@reqres.in", "password": "cityslicka")'
				);
				console.log('Error login : ', err);
			});
	};

	return (
		<section className='vh-100'>
			<Header />
			<div className='container-fluid h-custom mt-5'>
				<div className='row d-flex justify-content-center align-items-center h-100'>
					<div className='col-md-9 col-lg-6 col-xl-5'>
						<img
							src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
							className='img-fluid'
							alt='Sample image'
						/>
					</div>
					<div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
						<form>
							{/* Email input */}
							<label className='form-label mb-2' htmlFor='email'>
								Email address
							</label>
							<div className='form-outline mb-4'>
								<input
									type='email'
									id='email'
									name='email'
									className='form-control form-control-lg'
									placeholder='Enter a valid email address'
									value={user.email}
									onChange={(e) => setUser({ ...user, email: e.target.value })}
								/>
							</div>
							{/* Password input */}
							<div className='form-outline mb-3'>
								<label className='form-label mb-2' htmlFor='password'>
									Password
								</label>
								<input
									type='password'
									id='password'
									name='password'
									className='form-control form-control-lg'
									placeholder='Enter password'
									value={user.password}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
								/>
							</div>
							<p className='text-danger mt-3'>{errorMessage}</p>
							<div className='text-center text-lg-start mt-4 pt-2'>
								<button
									type='button'
									className='btn btn-primary btn-lg'
									style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
									onClick={onLogin}>
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default LoginPage;
