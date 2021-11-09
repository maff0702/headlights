import { Location } from 'history';
export type TLocationHook = { pathname?: string } & Location;

export interface ICategory {
  id: number;
  name: string;
  img: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductImg {
  id: number;
  name: string;
  productId: number;
}
export interface IProductInfo {
  id: number;
  featureTitle: string;
  featureDescription: string;
  categoryId: number;
}
export interface IProduct {
  readonly id: number;
  readonly name: string;
  readonly mainImg: string;
  price: number;
  description: string;
  vcode: string;
  group: string;
  readonly categoryId: number;
  info: IProductInfo[];
  img: IProductImg[];
}
