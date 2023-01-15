export interface AuthenticationInfo {
  accessToken: string,
  refreshToken: string,
  expires_in: number,
  profile: object
}

export enum UrlType {
  Backend = 5000, 
  Frontend = 3000
}