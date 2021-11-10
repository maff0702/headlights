import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/auth-service';
import { IUser } from '../types/user';

export const requestLogin = createAsyncThunk(
  'auth/requestLogin ',
  async (state: {login:string; password: string}, { rejectWithValue }) => {
    try {
      const response = await api.login(state);
      localStorage.setItem('token', response.data?.token?.split(' ')[1]);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const requestRegister = createAsyncThunk(
  'auth/requestLogin ',
  async (state: {login:string; password: string}, { rejectWithValue }) => {
    try {
      const response = await api.register(state);
      localStorage.setItem('token', response.data?.token?.split(' ')[1]);
      return response.data;
    } catch (e:any) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const requestCheckAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
    const response = await api.auth();
    localStorage.setItem('token', response.data?.token?.split(' ')[1]);
    return response.data;
  } catch (e:any) {
      localStorage.removeItem('token');
      return rejectWithValue(e.response.data);
    }
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
    logout: (state) => {
      state.user = null;
      state.token = '';
      state.isAuth = false;
    },
    setError: (state) => {
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: {
    [requestLogin.fulfilled.toString()]: (state, action:PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token?.split(' ')[1];
      state.isAuth = true;
      state.isError = false;
    },
    [requestLogin.rejected.toString()]: (state, action:PayloadAction<any>) => {
      state.isError = true;
      state.message = action.payload?.message;
    },
    [requestRegister.fulfilled.toString()]: (state, action:PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token?.split(' ')[1];
      state.isAuth = true;
      state.isError = false;
    },
    [requestRegister.rejected.toString()]: (state, action:PayloadAction<any>) => {
      state.isError = true;
      state.message = action.payload?.message;
    },
    [requestCheckAuth.fulfilled.toString()]: (state, action:PayloadAction<any>) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token?.split(' ')[1];
      state.isAuth = true;
      state.isError = false;
    },
    [requestCheckAuth.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
      state.isAuth = false;
    }
  }
});

export const {
  logout,
  setError
} = authSlice.actions;
export default authSlice.reducer;
