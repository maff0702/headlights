
export interface IUser {
  id: number;
  login: string;
  role: string;
}

export interface ILoginUser {
  success: boolean;
  user: IUser;
  token: string;
}
