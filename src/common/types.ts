export interface AuthenticationInfo {
  accessToken: string,
  refreshToken: string,
  expires_in: number,
  profile: object
}

export interface Credentials {
  access_token: string,
  expires_in: number,
  token_type: 'Bearer'
}

export interface ApiResponse {
  href: string,
  limit: number,
  next: string | null,
  offset: number,
  previous: string | null,
  total: number
}

export interface PlaylistItem {
  collaborative: boolean,
  description: string | null,
  external_urls: ExternalUrl,
  href: string,
  id: string,
  images: Image,
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

export interface Track {
  album: {
    external_urls: ExternalUrl,
    id: string,
    images: Image,
    name: string
  },
  artists: Array<{
    id: string,
    name: string
    external_urls: ExternalUrl,
  }>,
  duration_ms: number,
  explicit: boolean,
  external_urls: ExternalUrl,
  id: string,
  name: string
}

export interface TrackItem {
  added_at: string,
  track: Track;
}

export interface PlaylistResponse extends ApiResponse {
  items: Array<PlaylistItem>
}

export interface TrackResponse extends ApiResponse {
  items: Array<TrackItem>
}

export enum UrlType {
  Backend = 5000,
  Frontend = 3000
}

export type Image = Array<{ height: number, url: string, width: number }> | [];
export type ExternalUrl = { spotify: string }