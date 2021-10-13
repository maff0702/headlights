import { createSlice } from '@reduxjs/toolkit';
import { categories, products } from '../utils/data';

const initialState = {
  categories: categories,
  products: products
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
});

export default productsSlice.reducer;
