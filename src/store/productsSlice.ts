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
export const createCategory = createAsyncThunk(
  'products/createCategory',
  async (formData:any, { rejectWithValue }) => {
    try {
      const response = await apiCategory.categoriesCreate(formData);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const editCategory = createAsyncThunk(
  'products/editCategory',
  async ({ id, formData }:{ id:number; formData:any }, { rejectWithValue }) => {
    try {
      const response = await apiCategory.categoriesUpdate(id, formData);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  'products/deleteCategory',
  async ({ id }:{ id:number }, { rejectWithValue }) => {
    try {
      const response = await apiCategory.categoriesDelete(id);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
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
  async ({ name }:any) => {
    const response = await apiProduct.productGetOne({ name });
    return response.data;
  }
);
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData:any, { rejectWithValue }) => {
    try {
      const response = await apiProduct.productCreate(formData);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (formData:any, { rejectWithValue }) => {
    try {
      const response = await apiProduct.productUpdate(formData);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ id }:{ id:number }, { rejectWithValue }) => {
    try {
      const response = await apiProduct.productDelete(id);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const createImg = createAsyncThunk(
  'products/createImg',
  async (formData:any, { rejectWithValue }) => {
    try {
      const response = await apiProduct.imgCreate(formData);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const deleteImg = createAsyncThunk(
  'products/deleteImg',
  async ({ id }:{ id:number }, { rejectWithValue }) => {
    try {
      const response = await apiProduct.imgDelete(id);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const createInfo = createAsyncThunk(
  'products/createInfo',
  async (formData:any, { rejectWithValue }) => {
    try {
      const response = await apiProduct.infoCreate(formData);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const editInfo = createAsyncThunk(
  'products/editInfo',
  async (formData:any, { rejectWithValue }) => {
    try {
      const response = await apiProduct.infoUpdate(formData);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const deleteInfo = createAsyncThunk(
  'products/deleteInfo',
  async ({ id }:{ id:string }, { rejectWithValue }) => {
    try {
      const response = await apiProduct.infoDelete(id);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);

interface IProductState {
  categories: ICategory[] | null;
  products: IProduct[] | null;
  totalCount: number;
  currentPage: number;
  currentProduct: IProduct | null;
  message: string;
  messageInfo: string;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean
}

const initialState: IProductState = {
  categories: [],
  products: [],
  totalCount: 0,
  currentPage: 1,
  currentProduct: null,
  message: '',
  messageInfo: '',
  isSuccess: false,
  isLoading: false,
  isError: false
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state) => { state.products = null; },
    setPage: (state, action) => { state.currentPage = action.payload; },
    setSuccess: (state) => { state.isSuccess = false; },
    setError: (state) => {
      state.isError = false;
      state.message = '';
      state.messageInfo = '';
    }
  },
  extraReducers: {
    [getCategories.pending.toString()]: (state) => { state.isLoading = true; },
    [getCategories.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    [getCategories.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    [createCategory.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.categories?.push(action.payload);
      state.message = 'Категория добавлена!';
      state.isLoading = false;
      state.isError = false;
    },
    [createCategory.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.message = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [editCategory.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      const updated: ICategory = action.payload[1][0];
      if (state.categories && state.categories?.length > 0) {
        state.categories = state.categories?.map((item) => (item.id === updated?.id ? updated : item));
      }
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
    },
    [editCategory.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.message = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [deleteCategory.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      if (state.categories && state.categories?.length > 0) {
        state.categories = state.categories?.filter((item) => item.id !== action.payload?.id);
      }
      state.isLoading = false;
      state.isError = false;
    },
    [deleteCategory.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.message = action.payload?.message;
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
      state.isError = false;
    },
    [getProductsAll.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    [getProduct.pending.toString()]: (state) => { state.isLoading = true; },
    [getProduct.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.currentProduct = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    [getProduct.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    [createProduct.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.products?.push(action.payload);
      state.message = 'Товар добавлен!';
      state.isLoading = false;
      state.isError = false;
    },
    [createProduct.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.message = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [editProduct.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.currentProduct = action.payload.product;
      state.message = 'Успешно изменен!';
      state.isLoading = false;
      state.isError = false;
    },
    [editProduct.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.message = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [deleteProduct.fulfilled.toString()]: (state) => {
      state.message = 'Товар удален!';
      state.isLoading = false;
      state.isError = false;
    },
    [deleteProduct.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.message = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [createImg.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      // if (state.currentProduct?.img) {
      //   state.currentProduct.img = [...state.currentProduct.img, ...action.payload?.newImg];
      // }
      state.message = 'Картинка(и) добавлена(ы)!';
      state.isLoading = false;
      state.isError = false;
    },
    [createImg.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.message = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [deleteImg.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      if (state.currentProduct && state.currentProduct?.img?.length > 0) {
        state.currentProduct.img = state.currentProduct?.img?.filter((item) => item.id !== action.payload?.id);
      }
      state.message = 'Картинка удалена!';
      state.isLoading = false;
      state.isError = false;
    },
    [deleteImg.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.message = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [createInfo.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      if (state.currentProduct?.info) {
        state.currentProduct?.info.push(action.payload);
      }
      state.messageInfo = 'Характеристика добавлена!';
      state.isLoading = false;
      state.isError = false;
    },
    [createInfo.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.messageInfo = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [editInfo.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      const updated = action.payload;
      if (state.currentProduct) {
        state.currentProduct.info = state.currentProduct?.info?.map((item) => (item.id === updated?.id ? updated : item));
      }
      state.messageInfo = 'Характеристика изменена!';
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
    },
    [editInfo.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.messageInfo = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    },
    [deleteInfo.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      if (state.currentProduct && state.currentProduct?.info?.length > 0) {
        state.currentProduct.info = state.currentProduct?.info?.filter((item) => item.id !== action.payload?.id);
      }
      state.messageInfo = 'Характеристика удалена!';
      state.isLoading = false;
      state.isError = false;
    },
    [deleteInfo.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.messageInfo = action.payload?.message;
      state.isError = true;
      state.isLoading = false;
    }
  }
});

export const {
  setProducts,
  setPage,
  setSuccess,
  setError
} = productsSlice.actions;
export default productsSlice.reducer;
