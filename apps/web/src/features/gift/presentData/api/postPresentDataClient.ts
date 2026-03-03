import { api } from '@/shared/api/client';
import type { PresentDataRequest } from './types';

export const postPresentDataClient = async (request: PresentDataRequest) => {
  const { data } = await api.post(`/api/v1/presentData/send`, {
    dataAmount: request.dataAmount,
    targetSubId: request.targetSubId,
  });
  return data.data;
};
