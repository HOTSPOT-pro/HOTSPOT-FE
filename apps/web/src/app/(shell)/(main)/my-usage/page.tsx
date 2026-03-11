'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { UserRole } from '@/domains/user/model/types';
import { setUser } from '@/domains/user/store/userSlice';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
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

const AuthInfoSync = () => {
  const dispatch = useAppDispatch();

  const { data: authInfo } = useSuspenseQuery({
    queryFn: getAuthInfo,
    queryKey: ['authInfo'],
    staleTime: Infinity,
  });

  useEffect(() => {
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

  return null;
};

const Page = () => {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <AuthInfoSync />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
