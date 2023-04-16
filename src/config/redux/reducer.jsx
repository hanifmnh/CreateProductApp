import { combineReducers } from 'redux';
import productSlice from './product/productSlice';

const reducer = combineReducers({
	product: productSlice.reducer,
});

export default reducer;
