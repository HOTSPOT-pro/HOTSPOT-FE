'use client';

import { AgreementSection, OnboardingSection, useOnboarding } from '@features/onboarding';
import { Button } from '@hotspot/ui/components';
import { BottomSheet, Logo } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { useCallback, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { OnboardingInfo } from '@/features/onboarding/model/types';
import { ROUTES } from '@/shared/constants/routes';

export const OnBoardingPage = () => {
  const router = useRouter();
  const { submitOnboarding, isPending, errorMessage } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingData, setPendingData] = useState<OnboardingInfo | null>(null);
  const formId = useId();
  const openSheet = useCallback(() => setIsOpen(true), []);
  const closeSheet = useCallback(() => setIsOpen(false), []);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<OnboardingInfo>({
    defaultValues: { birth: '', tel: '' },
    mode: 'onChange',
  });

  const handleInputChange = useCallback(
    (name: keyof OnboardingInfo, formatter: (value: string) => string) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatter(e.target.value);
        setValue(name, formattedValue, { shouldValidate: true });
      },
    [setValue],
  );

  const handleClear = useCallback(
    (name: keyof OnboardingInfo) => () => {
      setValue(name, '', { shouldValidate: true });
    },
    [setValue],
  );

  const handleRequestSubmit = useCallback(
    (data: OnboardingInfo) => {
      setPendingData(data);
      openSheet();
    },
    [openSheet],
  );

  const handleConfirmSubmit = useCallback(async () => {
    if (!pendingData) {
      return;
    }

    try {
      await submitOnboarding(pendingData);
      closeSheet();
      router.replace(ROUTES.ONBOARDING.FAMILY);
    } catch {
      // Keep the sheet open so the user can see the error and retry.
    }
  }, [closeSheet, pendingData, router, submitOnboarding]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh px-16 pt-48 pb-16">
      <Logo size="sm" />
      <div className="flex flex-col w-full mt-10 mb-12 gap-8">
        <h2 className="font-title-title1">환영합니다!</h2>
        <span className="text-text-secondary font-body-body2">
          서비스를 시작하기 전에 간단한 정보를 입력해 주세요.
        </span>
      </div>
      <div className="w-full h-full flex flex-col justify-between">
        <OnboardingSection
          errors={errors}
          formId={formId}
          onClear={handleClear}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit(handleRequestSubmit)}
          register={register}
        />

        <div className="w-full">
          <Button disabled={!isValid} onClick={handleSubmit(handleRequestSubmit)} type="button">
            완료
          </Button>
        </div>
      </div>

      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={closeSheet}>
          <AgreementSection
            errorMessage={errorMessage}
            isPending={isPending}
            onValidSubmit={handleConfirmSubmit}
          />
        </BottomSheet>
      )}
    </div>
  );
};
