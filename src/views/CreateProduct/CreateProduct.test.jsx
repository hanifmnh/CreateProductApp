import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CreateProduct from './CreateProduct.view';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../config/redux/store';

describe('CreateProduct', () => {
	it('should allow input of Product Name and display it', () => {
		render(
			<Router>
				<Provider store={store}>
					<CreateProduct />
				</Provider>
			</Router>
		);
		const productName = screen.getByLabelText('Product Name');
		fireEvent.change(productName, { target: { value: 'New Product' } });
		expect(productName.value).toBe('New Product');
		expect(productName).toBeInTheDocument();
	});

	it('should save and display selected option of each form field', () => {
		render(
			<Router>
				<Provider store={store}>
					<CreateProduct />
				</Provider>
			</Router>
		);
		const productCategory = screen.getByLabelText('Product Category');
		const productFreshnessBrandNew = screen.getByLabelText('Product Freshness');
		const displayedProductCategory = screen.getByText('Electronic');
		const displayedProductFreshnessBrandNew = screen.getByText('Brand New');
		fireEvent.change(productCategory, { target: { value: 'Electronic' } });
		fireEvent.click(productFreshnessBrandNew);
		expect(productCategory.value).toBe('Electronic');
		expect(productFreshnessBrandNew.checked).toEqual(true);
		expect(displayedProductCategory).toBeInTheDocument();
		expect(displayedProductFreshnessBrandNew).toBeInTheDocument();
	});

	it('should display error message when Product Name is empty', async () => {
		render(
			<Router>
				<Provider store={store}>
					<CreateProduct />
				</Provider>
			</Router>
		);
		const submitButton = screen.getByText('Submit');
		fireEvent.click(submitButton);
		waitFor(() => {
			expect(
				screen.getByText('The product name field must be filled in')
			).toBeInTheDocument();
		});
	});

	it('should display error message when Product Name is contains symbols', async () => {
		render(
			<Router>
				<Provider store={store}>
					<CreateProduct />
				</Provider>
			</Router>
		);
		const productNameInput = screen.getByLabelText('Product Name');
		fireEvent.change(productNameInput, { target: { value: `~!@#$%^&*` } });
		waitFor(() => {
			expect(
				screen.getByText('Name must not contain symbols')
			).toBeInTheDocument();
		});
	});

	it('should display error message when Product Name is longer than 25 characters', async () => {
		render(
			<Router>
				<Provider store={store}>
					<CreateProduct />
				</Provider>
			</Router>
		);
		const productNameInput = screen.getByLabelText('Product Name');
		fireEvent.change(productNameInput, {
			target: { value: 'Very Long Product Name that Exceeds 25 Characters' },
		});
		waitFor(() => {
			expect(
				screen.getByText('Product Name must not exceed 25 characters')
			).toBeInTheDocument();
		});
	});

	it('should display error message when any form field is empty', async () => {
		render(
			<Router>
				<Provider store={store}>
					<CreateProduct />
				</Provider>
			</Router>
		);
		const submitButton = screen.getByText('Submit');
		fireEvent.click(submitButton);
		waitFor(() => {
			expect(
				screen.getByText('The product name field must be filled in')
			).toBeInTheDocument();
			expect(
				screen.getByText('The product category field must be filled in')
			).toBeInTheDocument();
			expect(
				screen.getByText('The image of product field must be filled in')
			).toBeInTheDocument();
			expect(
				screen.getByText('The product freshness field must be filled in')
			).toBeInTheDocument();
			expect(
				screen.getByText('The additional description field must be filled in')
			).toBeInTheDocument();
			expect(
				screen.getByText('The product price field must be filled in')
			).toBeInTheDocument();
		});
	});
});
