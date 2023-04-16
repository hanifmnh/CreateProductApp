import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const retrieveProduct = createAsyncThunk(
	'products/retrieveProduct',
	async () => {
		const res = await axios.get(
			'https://6431043c3adb159651640f8d.mockapi.io/products'
		);
		return res.data;
	}
);

export const createProduct = createAsyncThunk(
	'products/createProduct',
	async (data) => {
		const res = await axios.post(
			'https://6431043c3adb159651640f8d.mockapi.io/products',
			data
		);
		return res.data;
	}
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (data) => {
		const res = await axios.delete(
			`https://6431043c3adb159651640f8d.mockapi.io/products/${data.id}`,
			data
		);
		return res.data;
	}
);

export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async (data) => {
		const res = await axios.put(
			`https://6431043c3adb159651640f8d.mockapi.io/products/${data.id}`,
			data
		);
		return res.data;
	}
);
