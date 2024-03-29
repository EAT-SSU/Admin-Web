import { Cookies } from 'react-cookie';


const cookies = new Cookies();

export const setAccessToken = (accessToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 1);

    return cookies.set('access_token', accessToken, { 
        sameSite: 'strict', 
        path: "/", 
        expires: new Date(expireDate)
    });
};

export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 1);

    return cookies.set('refresh_token', refreshToken, { 
        sameSite: 'strict', 
        path: "/", 
        expires: new Date(expireDate)
    });
};

export const getAccressToken = () => {
    return cookies.get('access_token');
};
export const getRefreshToken = () => {
    return cookies.get('refresh_token');
};

export const removeAllTokens = () => {
    cookies.remove('access_token', { sameSite: 'strict', path: "/" });
    cookies.remove('refresh_token', { sameSite: 'strict', path: "/" });
};