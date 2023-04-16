import { createSlice } from '@reduxjs/toolkit';
import {
	retrieveProduct,
	createProduct,
	deleteProduct,
	updateProduct,
} from './productThunk';

const initialState = {
	listProduct: [],
	type: '',
	isEdit: false,
};

const productSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {
		setIsEdit: (state, action) => {
			return {
				...state,
				isEdit: action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(retrieveProduct.fulfilled, (state, action) => {
				return {
					...state,
					listProduct: action.payload,
					type: action.type,
				};
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				return {
					...state,
					type: action.type,
				};
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				return {
					...state,
					type: action.type,
				};
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				return {
					...state,
					type: action.type,
				};
			});
	},
});

export default productSlice;
