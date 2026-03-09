'use client';

import { useEffect } from 'react';
import type { UserRole } from '@/entities/user/model/types';
import { setUser } from '@/entities/user/store/userSlice';
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

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      try {
        const { data } = await api.get<ApiResponse<AuthInfoResponse>>('/api/v1/auth/info');

        dispatch(
          setUser({
            email: data.data.email,
            familyId: data.data.familyId,
            familyRole: data.data.familyRole,
            name: data.data.name,
            phone: data.data.phone,
            subId: data.data.subId,
          }),
        );
      } catch {
        // no-op
      }
    };

    void fetchAuthInfo();
  }, [dispatch]);

  return null;
};

export default Page;
