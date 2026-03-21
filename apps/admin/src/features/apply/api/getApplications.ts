import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { GetApplicationsRequest, GetApplicationsResponse } from './types';

export const getApplications = async ({
  applyType,
  page,
  size,
  status,
}: GetApplicationsRequest): Promise<GetApplicationsResponse> => {
  const response = await api.get<ApiResponse<GetApplicationsResponse>>(
    `/api/v1/admin/families/requests/${applyType}/${status}`,
    {
      params: {
        page,
        size,
      },
    },
  );

  return response.data.data;
};
