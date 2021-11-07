import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/auth-service';
import { IUser } from '../types/user';

export const requestLogin = createAsyncThunk(
  'auth/requestLogin ',
  async (state: {login:string; password: string}) => {
    const response = await api.login(state);
    localStorage.setItem('token', response.data?.token?.split(' ')[1]);
    return response.data;
  }
);
export const requestCheckAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await api.auth();
    localStorage.setItem('token', response.data?.token?.split(' ')[1]);
    return response.data;
  }
);

interface IUserState {
  user: IUser | null;
  token: string;
  isAuth: boolean;
  message: string;
  isLoading: boolean;
  isError: boolean
}

const initialState: IUserState = {
  user: null,
  token: '',
  isAuth: false,
  message: '',
  isLoading: false,
  isError: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state) => { state.isError = false; }
  },
  extraReducers: {
    [requestLogin.fulfilled.toString()]: (state, action:PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token.split(' ')[1];
      state.isAuth = true;
      state.isError = false;
    },
    [requestLogin.rejected.toString()]: (state, action:PayloadAction<any>) => {
      state.isError = true;
      console.log(action.payload);
    },
    [requestCheckAuth.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [requestCheckAuth.fulfilled.toString()]: (state, action:PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token.split(' ')[1];
      state.isAuth = true;
      state.isError = false;
    },
    [requestCheckAuth.rejected.toString()]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log(action.payload);
    }
  }
});

export const {
  setError
} = authSlice.actions;
export default authSlice.reducer;
