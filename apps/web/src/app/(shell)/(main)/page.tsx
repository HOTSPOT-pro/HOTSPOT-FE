'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { UserRole } from '@/entities/user/model/types';
import { setUser } from '@/entities/user/store/userSlice';
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

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const fetchAuthInfo = async () => {
      const { data } = await api.get<ApiResponse<AuthInfoResponse>>('/api/v1/auth/info');

      if (!isMounted) return;

      dispatch(
        setUser({
          email: data.data.email,
          familyId: data.data.familyId,
          familyRole: data.data.familyRole,
          id: data.data.subId,
          name: data.data.name,
          phone: data.data.phone,
        }),
      );
      router.replace(ROUTES.FAMILY_STATUS);
    };

    void fetchAuthInfo();

    return () => {
      isMounted = false;
    };
  }, [dispatch, router]);

  return null;
};

export default Page;
