import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { Block } from './types';

export const getBlockClientApi = async () => {
  const { data } = await api.get<ApiResponse<Block[]>>(`/api/v1/blocking`);
  return data.data;
};
