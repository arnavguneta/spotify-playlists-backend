import { UrlType } from './types.js';
export const getURL = (type) => {
    return (process.env.NODE_ENV === 'prod')
        ? process.env.PROD_PROJECT_URL
        : (type === UrlType.Backend)
            ? process.env.DEV_PROJECT_URL + UrlType.Backend
            : process.env.DEV_PROJECT_URL + UrlType.Frontend;
};
//# sourceMappingURL=utils.js.map