import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  name: string;
  exp: number;
  [key: string]: any;
}

export const getAuthInfoFromToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('토큰 디코딩 실패:', error);
    return null;
  }
};
