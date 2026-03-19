'use client';

import { CategorySelectSection } from '@features/onboarding/ui/CategorySelectSection';
import { useModal } from '@hotspot/ui';
import { Logo } from '@shared/ui';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import type { UserRole } from '@/domains/user/model/types';
import { api } from '@/shared/api/client';
import type { ApiErrorResponse, ApiResponse } from '@/shared/api/types';
import { ROUTES } from '@/shared/constants/routes';

interface AuthInfoResponse {
  email: string;
  familyId: number | null;
  familyRole: UserRole | null;
  name: string;
  phone: string;
  subId: number;
}

export const OnBoardingFamilyPage = () => {
  const { open } = useModal();
  const router = useRouter();
  const [isCheckingHomeAccess, setIsCheckingHomeAccess] = useState(false);

  const handleHomeClick = useCallback(async () => {
    if (isCheckingHomeAccess) {
      return;
    }

    setIsCheckingHomeAccess(true);

    try {
      const { data } = await api.get<ApiResponse<AuthInfoResponse>>('/api/v1/auth/info');

      if (!data.data.familyId) {
        open('errorModal', {
          props: {
            content: '가족에 등록된 뒤 홈 화면으로 이동할 수 있습니다.',
            onConfirm: () => {},
            title: '홈 화면 진입 불가',
          },
        });
        return;
      }

      router.push(ROUTES.HOME);
    } catch (error) {
      const errorMessage =
        (error as AxiosError<ApiErrorResponse>).response?.data?.message ??
        '사용자 정보를 확인하지 못했습니다. 잠시 후 다시 시도해주세요.';

      open('errorModal', {
        props: {
          content: errorMessage,
          onConfirm: () => {},
          title: '오류',
        },
      });
    } finally {
      setIsCheckingHomeAccess(false);
    }
  }, [isCheckingHomeAccess, open, router]);

  const handleCreateClick = useCallback(() => {
    open('createFamilyModal');
  }, [open]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh px-16 pt-48 pb-16">
      <Logo size="sm" />
      <div className="flex flex-col w-full mt-40 mb-48 gap-8">
        <h2 className="font-title-title1">단계를 선택해주세요</h2>
        <span className="text-text-secondary font-body-body2">
          가족에 이미 등록되어 있다면 홈 화면으로,
          <br />
          새로 가족을 구성하려면 새 가족 생성을 선택하세요.
        </span>
      </div>
      <CategorySelectSection onCreateClick={handleCreateClick} onHomeClick={handleHomeClick} />
    </div>
  );
};
