import { Location } from 'history';
export type TLocationHook = { pathname?: string } & Location;

export interface ICategory {
  id: number;
  name: string;
  img: string[];
}

export interface IProductImg {
  id: number;
  name: string;
  productId: string;
}
export interface IProduct {
  id: number;
  name: string;
  mainImg: string;
  price: number;
  description: string;
  vcode: string;
  group: string;
  categoryId: number;
  info: [];
  img: IProductImg[];
}
