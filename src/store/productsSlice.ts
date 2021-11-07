import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiCategory from '../services/categories-service';
import apiProduct from '../services/product-service';
import {
  ICategory,
  IProduct
} from '../types/main';

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async () => {
    const response = await apiCategory.categoriesGetAll();
    return response.data;
  }
);
export const createCategories = createAsyncThunk(
  'products/createCategories',
  async (formData:any) => {
    const response = await apiCategory.categoriesCreate(formData);
    return response.data;
  }
);
export const getProductsAll = createAsyncThunk(
  'products/getProductsAll',
  async (data:{ params: any }) => {
    const response = await apiProduct.productGetAll(data.params);
    return response.data;
  }
);
export const getProduct = createAsyncThunk(
  'products/getProduct',
  async ({ name }: any) => {
    const response = await apiProduct.productGetOne({ name });
    return response.data;
  }
);
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData:any) => {
    const response = await apiProduct.productCreate(formData);
    return response.data;
  }
);

interface IProductState {
  categories: ICategory[] | null;
  products: IProduct[] | null;
  totalCount: number;
  currentPage: number;
  currentProduct: IProduct | null;
  isLoading: boolean;
  isError: boolean
}

const initialState: IProductState = {
  categories: null,
  products: null,
  totalCount: 0,
  currentPage: 1,
  currentProduct: null,
  isLoading: false,
  isError: false
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state) => { state.products = null; },
    setPage: (state, action) => { state.currentPage = action.payload; },
    setError: (state) => { state.isError = false; }
  },
  extraReducers: {
    [getCategories.pending.toString()]: (state) => { state.isLoading = true; },
    [getCategories.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    [getCategories.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    [getProductsAll.pending.toString()]: (state) => {
      state.isLoading = true;
      state.products = null;
    },
    [getProductsAll.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.products = action.payload.rows;
      state.totalCount = action.payload.count;
      state.isLoading = false;
    },
    [getProductsAll.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    [getProduct.pending.toString()]: (state) => { state.isLoading = true; },
    [getProduct.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.currentProduct = action.payload;
      state.isLoading = false;
    },
    [getProduct.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
    }
  }
});

export const {
  setProducts,
  setPage,
  setError
} = productsSlice.actions;
export default productsSlice.reducer;
