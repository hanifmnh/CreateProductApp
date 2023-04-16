import React from 'react';
import useFormProductModel from './FormProduct.model';
import { Container, Form, Table, Button } from 'react-bootstrap';
import RandomNumber from './RandomNumber';
import '../styles/FormProduct.css';

const FormProduct = () => {
	const model = useFormProductModel();

	return (
		<>
			<Container className='p-5' style={{ maxWidth: '600px' }}>
				<h4 className='mb-3'>Detail Product</h4>
				<Form
					onSubmit={
						model.isEdit
							? (e) => model.handleUpdateProduct(model.formik.values, e)
							: model.formik.handleSubmit
					}>
					{/* Name */}
					<Form.Group className='mb-5'>
						<Form.Label htmlFor='productName'>Product Name</Form.Label>
						<Form.Control
							type='text'
							id='productName'
							value={model.formik.values.productName}
							onChange={model.formik.handleChange}
							onBlur={model.formik.handleBlur}
							className={
								model.formik.errors.productName &&
								model.formik.touched.productName
									? 'w-50 input-error'
									: 'w-50'
							}
						/>
						{model.formik.errors.productName &&
							model.formik.touched.productName && (
								<small className='error'>
									{model.formik.errors.productName}
								</small>
							)}
					</Form.Group>
					{/* Category */}
					<Form.Group className='mb-5'>
						<Form.Label htmlFor='productCategory'>Product Category</Form.Label>
						<Form.Select
							id='productCategory'
							value={model.formik.values.productCategory}
							onChange={model.formik.handleChange}
							onBlur={model.formik.handleBlur}
							className={
								model.formik.errors.productCategory &&
								model.formik.touched.productCategory
									? 'w-50 input-error'
									: 'w-50'
							}>
							<option value=''>Choose ...</option>
							<option value='Electronic'>Electronic</option>
							<option value='Fashion'>Fashion</option>
							<option value='Furniture'>Furniture</option>
						</Form.Select>
						{model.formik.errors.productCategory &&
							model.formik.touched.productCategory && (
								<small className='error'>
									{model.formik.errors.productCategory}
								</small>
							)}
					</Form.Group>
					{/* Image */}
					<Form.Group className='mb-5'>
						<Form.Label htmlFor='productImage'>Image of Product</Form.Label>
						<Form.Control
							type='file'
							id='productImage'
							// onChange={model.formik.handleChange}
							onChange={(e) => {
								model.formik.setFieldValue(
									'productImage',
									URL.createObjectURL(e.target.files[0])
								);
							}}
							onBlur={model.formik.handleBlur}
							className={
								model.formik.errors.productImage &&
								model.formik.touched.productImage
									? 'w-50 input-error'
									: 'w-50'
							}
						/>
						{model.formik.errors.productImage &&
							model.formik.touched.productImage && (
								<small className='error'>
									{model.formik.errors.productImage}
								</small>
							)}
					</Form.Group>
					{/* Freshness */}
					<Form.Group className='mb-5'>
						<Form.Label htmlFor='productFreshness'>
							Product Freshness
						</Form.Label>
						<Form.Check
							type='radio'
							id='brandNew'
							name='productFreshness'
							label='Brand New'
							value='Brand New'
							onChange={model.formik.handleChange}
							onBlur={model.formik.handleBlur}
						/>
						<Form.Check
							type='radio'
							id='secondHand'
							name='productFreshness'
							label='Second Hand'
							value='Second Hand'
							onChange={model.formik.handleChange}
							onBlur={model.formik.handleBlur}
						/>
						<Form.Check
							type='radio'
							id='refurbished'
							name='productFreshness'
							label='Refurbished'
							value='Refurbished'
							onChange={model.formik.handleChange}
							onBlur={model.formik.handleBlur}
						/>
						{model.formik.errors.productFreshness &&
							model.formik.touched.productFreshness && (
								<small className='error'>
									{model.formik.errors.productFreshness}
								</small>
							)}
					</Form.Group>
					{/* Description */}
					<Form.Group className='mb-5'>
						<Form.Label htmlFor='description'>
							Additional Description
						</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							id='description'
							value={model.formik.values.description}
							onChange={model.formik.handleChange}
							onBlur={model.formik.handleBlur}
							className={
								model.formik.errors.description &&
								model.formik.touched.description
									? 'input-error'
									: ''
							}
						/>
						{model.formik.errors.description &&
							model.formik.touched.description && (
								<small className='error'>
									{model.formik.errors.description}
								</small>
							)}
					</Form.Group>
					{/* Price */}
					<Form.Group className='mb-5'>
						<Form.Label>Product Price</Form.Label>
						<Form.Control
							type='number'
							id='productPrice'
							placeholder='$ 1'
							value={model.formik.values.productPrice}
							onChange={model.formik.handleChange}
							onBlur={model.formik.handleBlur}
							className={
								model.formik.errors.productPrice &&
								model.formik.touched.productPrice
									? 'px-3 input-error'
									: 'px-3'
							}
						/>
						{model.formik.errors.productPrice &&
							model.formik.touched.productPrice && (
								<small className='error'>
									{model.formik.errors.productPrice}
								</small>
							)}
					</Form.Group>
					{/* Submit */}
					<div className='d-grid mx-3' style={{ marginTop: '138px' }}>
						<Button variant='primary' type='submit'>
							{model.isEdit ? 'Update' : 'Submit'}
						</Button>
					</div>
				</Form>
				{/* Random Number */}
				<RandomNumber />
			</Container>
			{/* Table */}
			<Container className='my-5'>
				<h2 className='text-center mb-4'>List Product</h2>
				{model.loading && <div className='text-center'>Loading...</div>}
				<Table striped responsive>
					<thead>
						<tr>
							<th>No</th>
							<th>Product Name</th>
							<th>Product Category</th>
							<th>Image Of Product</th>
							<th>Product Freshness</th>
							<th>Additional Description</th>
							<th>Product Price</th>
							<th colSpan={2}>Action</th>
						</tr>
					</thead>
					<tbody>
						{model.products.map((item, index) => (
							<tr key={index}>
								<td>{item.uuid}</td>
								<td>{item.productName}</td>
								<td>{item.productCategory}</td>
								<td>{item.productImage}</td>
								<td>{item.productFreshness}</td>
								<td>{item.description}</td>
								<td>{item.productPrice}</td>
								<td>
									<Button
										variant='danger'
										className='w-100'
										onClick={() => {
											model.handleDeleteProduct(item.id);
										}}>
										Delete
									</Button>
								</td>
								<td>
									<Button
										variant='success'
										className='w-100'
										onClick={() => {
											model.handleEditProduct(item);
										}}>
										Edit
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default FormProduct;
