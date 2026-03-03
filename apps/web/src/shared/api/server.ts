/** biome-ignore-all lint/correctness/noProcessGlobal: server env access */
import 'server-only';
import axios, { type AxiosInstance } from 'axios';
import { cookies } from 'next/headers';

const SERVER_BASE_URL = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

export const createServerApi = async (): Promise<AxiosInstance> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return axios.create({
    baseURL: SERVER_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    timeout: 10000,
    withCredentials: true,
  });
};

export const serverApi: Promise<AxiosInstance> = createServerApi();
