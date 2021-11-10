import { AxiosResponse } from 'axios';
import axiosAPI from '../utils/api';

import {
  // IUser,
  ILoginUser
} from '../types/user';

export default class AuthService {
  static async login ({ login, password }:{login: string; password: string}): Promise<AxiosResponse<ILoginUser>> {
    return axiosAPI.post<ILoginUser>('/user/login', { login, password });
  }

  static async register ({ login, password }:{login: string; password: string}): Promise<AxiosResponse<ILoginUser>> {
    return axiosAPI.post<ILoginUser>('/user/register', { login, password });
  }

  static async auth (): Promise<AxiosResponse<ILoginUser>> {
    return axiosAPI.get<ILoginUser>('/user/auth');
  }
}
