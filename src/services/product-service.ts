import { AxiosResponse } from 'axios';
import axiosAPI from '../utils/api';

import {
  // IUser,
  ILoginUser
} from '../types/user';

export default class ProductService {
  static async productCreate (formData: any): Promise<AxiosResponse<ILoginUser>> {
    return axiosAPI.post<any>('/product', formData);
  }

  static async productGetAll ({ categoryId, search, group, limit, page }:any): Promise<AxiosResponse<any>> {
    limit = limit || 15;
    page = page || 1;
    return axiosAPI.get<any>(`/product?categoryId=${categoryId}&search=${search}&group=${group}&limit=${limit}&page=${page}`);
  }

  static async productGetOne ({ name }: any): Promise<AxiosResponse> {
    return axiosAPI.get<any>(`/product/${name}`);
  }

  static async productUpdate (productInfo: any): Promise<AxiosResponse<any>> {
    return axiosAPI.patch<any>('/product', { ...productInfo });
  }

  static async productDelete (id: string): Promise<AxiosResponse<ILoginUser>> {
    return axiosAPI.delete(`/product/${id}`);
  }

  static async imgCreate (formData: any): Promise<AxiosResponse<ILoginUser>> {
    return axiosAPI.post<any>('/product/img', formData);
  }

  static async imgDelete (id: number): Promise<AxiosResponse<ILoginUser>> {
    return axiosAPI.delete(`/product/img/${id}`);
  }

  static async infoCreate ({ productId, title, description }: any): Promise<AxiosResponse<any>> {
    console.log();
    return axiosAPI.post<any>('/product/info', { productId, title, description });
  }

  static async infoUpdate ({ id, title, description }: any): Promise<AxiosResponse<any>> {
    return axiosAPI.patch<any>('/product/info', { id, title, description });
  }

  static async infoDelete (id: string): Promise<AxiosResponse<ILoginUser>> {
    return axiosAPI.delete(`/product/info/${id}`);
  }
}
