import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    auth: authSlice
  }
});
// store.subscribe(() => {
//   localStorage.setItem('token', store.getState().auth.token ? store.getState().auth.token : '');
// });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
