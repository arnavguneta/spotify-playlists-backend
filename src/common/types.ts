export interface AuthenticationInfo {
  accessToken: string,
  refreshToken: string,
  expires_in: number,
  profile: object
}

export interface ApiResponse {
  href: string,
  limit: number,
  next: string | null,
  offset: number,
  previous: string | null,
  total: number
}

export interface PlaylistItems {
  collaborative: boolean,
  description: string | null,
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  images: Array<{
    height: number,
    url: string,
    width: number
  }> | [],
  name: string,
  owner: object,
  public: boolean,
  snapshot_id: string,
  tracks: {
    href: string,
    total: number
  } | null,
  type: string,
  uri: string
}

export interface PlaylistResponse extends ApiResponse {
  items: Array<PlaylistItems>
}

export enum UrlType {
  Backend = 5000,
  Frontend = 3000
}
