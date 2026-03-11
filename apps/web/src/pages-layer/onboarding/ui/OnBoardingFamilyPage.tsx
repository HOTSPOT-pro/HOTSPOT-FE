'use client';

import { CategorySelectSection } from '@features/onboarding/ui/CategorySelectSection';
import { useModal } from '@hotspot/ui';
import { Logo } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ROUTES } from '@/shared/constants/routes';

export const OnBoardingFamilyPage = () => {
  const { open } = useModal();
  const router = useRouter();
  const handleHomeClick = useCallback(() => {
    router.push(ROUTES.HOME);
  }, [router]);
  const handleCreateClick = useCallback(() => {
    open('createFamilyModal');
  }, [open]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh px-4 pt-12 pb-4">
      <Logo size="sm" />
      <div className="flex flex-col w-full mt-10 mb-12 gap-2">
        <h2 className="font-bold text-2xl ">단계를 선택해주세요</h2>
        <span className="text-gray-600 font-light text-base">
          가족에 이미 등록되어 있다면 홈 화면으로,
          <br />
          새로 가족을 구성하려면 새 가족 생성을 선택하세요.
        </span>
      </div>
      <CategorySelectSection onCreateClick={handleCreateClick} onHomeClick={handleHomeClick} />
    </div>
  );
};
