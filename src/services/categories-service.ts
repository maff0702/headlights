import { AxiosResponse } from 'axios';
import axiosAPI from '../utils/api';

import {
  // IUser,
  // ILoginUser
} from '../types/user';

export default class CategoryService {
  static async categoriesCreate (formData: any): Promise<AxiosResponse<any>> {
    return axiosAPI.post<any>('/categories', formData);
  }

  static async categoriesGetAll (): Promise<AxiosResponse<any>> {
    return axiosAPI.get<any>('/categories');
  }

  static async categoriesUpdate (id: number, formData: any): Promise<AxiosResponse<any>> {
    return axiosAPI.patch<any>(`/categories/${id}`, formData);
  }

  static async categoriesDelete (id: number): Promise<AxiosResponse<any>> {
    return axiosAPI.delete(`/categories/${id}`);
  }
}
