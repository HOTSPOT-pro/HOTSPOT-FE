import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getApplications } from '@/features/apply/api/getApplications';
import type { GetApplicationsRequest, GetApplicationsResponse } from '@/features/apply/api/types';
import type { ApiErrorResponse } from '@/shared/api/types';

const APPLICATIONS_QUERY_KEY = 'applications';

export function useApplicationsQuery(
  params: GetApplicationsRequest,
): UseQueryResult<GetApplicationsResponse, AxiosError<ApiErrorResponse>> {
  return useQuery({
    queryFn: () => getApplications(params),
    queryKey: [APPLICATIONS_QUERY_KEY, params],
  });
}
