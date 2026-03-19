'use client';

import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import type { UserRole } from '@/domains/user/model/types';
import { clearUser, setUser } from '@/domains/user/store/userSlice';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import { ROUTES } from '@/shared/constants/routes';
import { useAppDispatch } from '@/shared/store/hooks';

interface AuthInfoResponse {
  subId: number;
  familyId: number;
  name: string;
  email: string;
  phone: string;
  familyRole: UserRole;
}

const getAuthInfo = async () => {
  const { data } = await api.get<ApiResponse<AuthInfoResponse>>('/api/v1/auth/info');
  return data.data;
};

export const AuthSyncGate = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const {
    data: authInfo,
    error,
    isError,
    isPending,
  } = useQuery({
    queryFn: getAuthInfo,
    queryKey: ['authInfo'],
    retry: false,
    staleTime: Infinity,
  });

  const status = (error as AxiosError | null)?.response?.status;

  useEffect(() => {
    if (!authInfo) {
      return;
    }

    dispatch(
      setUser({
        email: authInfo.email,
        familyId: authInfo.familyId,
        familyRole: authInfo.familyRole,
        name: authInfo.name,
        phone: authInfo.phone,
        subId: authInfo.subId,
      }),
    );
  }, [authInfo, dispatch]);

  useEffect(() => {
    if (!(isError && (status === 401 || status === 403))) {
      return;
    }

    dispatch(clearUser());

    if (typeof window !== 'undefined') {
      window.location.replace(ROUTES.LOGIN);
    }
  }, [dispatch, isError, status]);

  if (isPending || isError || !authInfo) {
    return null;
  }

  return <>{children}</>;
};
