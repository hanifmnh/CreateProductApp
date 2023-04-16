import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const ProductList = () => {
	const [search, setSearch] = useState('');
	const [limit, setLimit] = useState(3);

	const SEARCH_PRODUCT_QUERY = gql`
		query SEARCH_PRODUCT_QUERY($productName: String, $limit: Int!) {
			product(where: { productName: { _ilike: $productName } }, limit: $limit) {
				id
				uuid
				productName
				productCategory
				productImage
				productFreshness
				description
				productPrice
			}
		}
	`;

	const { data } = useQuery(SEARCH_PRODUCT_QUERY, {
		variables: {
			productName: `%${search}%`,
			limit: limit,
		},
	});

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleLoadMore = () => {
		setLimit(limit + 10);
	};

	return (
		<Container className='my-3'>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<div>
					<h1>PRODUCT LIST</h1>
				</div>
				<div>
					<Form className='d-flex'>
						<Form.Control
							type='text'
							placeholder='Search Product'
							value={search}
							onChange={handleSearch}
						/>
					</Form>
				</div>
			</div>
			<div className='row row-cols-2 row-cols-lg-3 g-5'>
				{data?.product.map((product, index) => (
					<div key={index} className='col'>
						<Card>
							<svg
								className='bd-placeholder-img card-img-top'
								width='100%'
								height={225}
								xmlns='http://www.w3.org/2000/svg'
								role='img'
								aria-label='Placeholder: Thumbnail'
								preserveAspectRatio='xMidYMid slice'
								focusable='false'>
								<title>Placeholder</title>
								<rect width='100%' height='100%' fill='#55595c' />
							</svg>
							<Card.Body>
								<Card.Title>{product.productName}</Card.Title>
								<Card.Text>{product.description}</Card.Text>
								<Button variant='outline-dark' className='btn-sm'>
									Detail View
								</Button>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>
			<div className='d-grid d-flex justify-content-end mt-3'>
				<button
					className='btn btn-primary'
					type='button'
					onClick={handleLoadMore}>
					Load More
				</button>
			</div>
		</Container>
	);
};

export default ProductList;
