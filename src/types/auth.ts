// Type definitions for authentication
export interface IToken {
  value: string;
  expiresIn?: number;
}

export interface IRole {
  name: string;
  [key: string]: unknown;
}

export interface IAuthLoginResponse {
  token: IToken;
  refreshToken: IToken;
  roles?: IRole[];
  [key: string]: unknown;
}
