import { useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ProductSlice from '../config/redux/product/productSlice';
import { v4 as uuidv4 } from 'uuid';
import { gql, useMutation, useQuery } from '@apollo/client';

const RETRIEVE_PRODUCT_QUERY = gql`
	query RETRIEVE_PRODUCT_QUERY {
		product(order_by: { id: asc }) {
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

const INSERT_PRODUCT_MUTATION = gql`
	mutation INSERT_PRODUCT_MUTATION(
		$uuid: String!
		$productName: String!
		$productCategory: String!
		$productImage: String!
		$productFreshness: String!
		$description: String!
		$productPrice: Int!
	) {
		insert_product_one(
			object: {
				uuid: $uuid
				productName: $productName
				productCategory: $productCategory
				productImage: $productImage
				productFreshness: $productFreshness
				description: $description
				productPrice: $productPrice
			}
		) {
			id
		}
	}
`;

const DELETE_PRODUCT_MUTATION = gql`
	mutation DELETE_PRODUCT_MUTATION($id: Int!) {
		delete_product_by_pk(id: $id) {
			id
		}
	}
`;

const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
		$id: Int!
		$uuid: String!
		$productName: String!
		$productCategory: String!
		$productImage: String!
		$productFreshness: String!
		$description: String!
		$productPrice: Int!
	) {
		update_product_by_pk(
			pk_columns: { id: $id }
			_set: {
				uuid: $uuid
				productName: $productName
				productCategory: $productCategory
				productImage: $productImage
				productFreshness: $productFreshness
				description: $description
				productPrice: $productPrice
			}
		) {
			id
		}
	}
`;

const useFormProductModel = () => {
	const { loading: retrieveProductLoading, data: productData } = useQuery(
		RETRIEVE_PRODUCT_QUERY
	);
	const [insertProduct, { loading: insertProductLoading }] = useMutation(
		INSERT_PRODUCT_MUTATION,
		{
			refetchQueries: [{ query: RETRIEVE_PRODUCT_QUERY }],
		}
	);
	const [deleteProduct, { loading: deleteProductLoading }] = useMutation(
		DELETE_PRODUCT_MUTATION,
		{
			refetchQueries: [{ query: RETRIEVE_PRODUCT_QUERY }],
		}
	);
	const [updateProduct, { loading: updateProductLoading }] = useMutation(
		UPDATE_PRODUCT_MUTATION,
		{
			refetchQueries: [{ query: RETRIEVE_PRODUCT_QUERY }],
		}
	);
	const dispatch = useDispatch();
	const isEdit = useSelector((state) => state.product.isEdit);

	const handleDeleteProduct = useCallback((id) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			deleteProduct({
				variables: { id },
			});
		}
	});

	const handleEditProduct = (product) => {
		formik.setValues({
			id: product.id,
			uuid: product.uuid,
			productName: product.productName,
			productCategory: product.productCategory,
			productImage: product.productImage,
			productFreshness: product.productFreshness,
			description: product.description,
			productPrice: product.productPrice,
		});
		dispatch(ProductSlice.actions.setIsEdit(true));
	};

	const handleUpdateProduct = (product, e) => {
		e.preventDefault();
		updateProduct({
			variables: {
				id: product.id,
				uuid: product.uuid,
				productName: product.productName,
				productCategory: product.productCategory,
				productImage: product.productImage,
				productFreshness: product.productFreshness,
				description: product.description,
				productPrice: product.productPrice,
			},
		});
		dispatch(ProductSlice.actions.setIsEdit(false));
		formik.resetForm();
	};

	const formik = useFormik({
		initialValues: {
			uuid: uuidv4(),
			productName: '',
			productCategory: '',
			productImage: '',
			productFreshness: '',
			description: '',
			productPrice: '',
		},
		validationSchema: Yup.object().shape({
			productName: Yup.string()
				.matches(/^[a-zA-Z0-9 ]+$/, 'Name must not contain symbols')
				.max(10, 'Product Name must not exceed 10 characters')
				.required('The product name field must be filled in'),
			productCategory: Yup.string().required(
				'The product category field must be filled in'
			),
			productImage: Yup.mixed().required(
				'The image of product field must be filled in'
			),
			productFreshness: Yup.string().required(
				'The product freshness field must be filled in'
			),
			description: Yup.string()
				.matches(/^[a-zA-Z0-9 ]+$/, 'Description must not contain symbols')
				.required('The additional description field must be filled in'),
			productPrice: Yup.number().required(
				'The product price field must be filled in'
			),
		}),
		onSubmit: (values, { resetForm }) => {
			insertProduct({
				variables: {
					uuid: values.uuid,
					productName: values.productName,
					productCategory: values.productCategory,
					productImage: values.productImage,
					productFreshness: values.productFreshness,
					description: values.description,
					productPrice: values.productPrice,
				},
			});
			resetForm();
		},
	});

	const loading =
		retrieveProductLoading ||
		insertProductLoading ||
		deleteProductLoading ||
		updateProductLoading;

	return {
		products: productData?.product || [],
		loading,
		isEdit,
		formik,
		handleDeleteProduct,
		handleEditProduct,
		handleUpdateProduct,
	};
};

export default useFormProductModel;
