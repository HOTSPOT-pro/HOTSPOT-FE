'use client';

import { getAuthInfoFromToken } from '@shared/lib';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { UserAuth } from '@/entities/user/model/type';
import { useUserStore } from '../../../entities/user/store/useUserStore';

export const TokenHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const pathname = usePathname();

  const { setAuth } = useUserStore();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      const decoded = getAuthInfoFromToken(accessToken);

      if (decoded) {
        localStorage.setItem('accessToken', accessToken);
        setAuth({
          accessToken,
          userId: Number(decoded.id),
          userName: decoded.name,
        } as UserAuth);
      }

      router.replace(window.location.pathname);
    }
  }, [searchParams, setAuth, router]);

  return null;
};
