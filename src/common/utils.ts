import { UrlType } from './types.js';

export const getURL = (type: UrlType): string => {
  return (process.env.NODE_ENV === 'prod')
    ? <string>process.env.PROD_PROJECT_URL
    : (type === UrlType.Backend) 
      ? <string>process.env.DEV_PROJECT_URL + UrlType.Backend
      : <string>process.env.DEV_PROJECT_URL + UrlType.Frontend;
};