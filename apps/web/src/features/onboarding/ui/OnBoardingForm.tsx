'use client';

import { useOnboarding } from '@entities/onboarding';
import type { OnboardingInfo } from '@entities/user';
import { Button, Input } from '@hotspot/ui/components';
import { formatBirth, formatTel } from '@shared/lib';
import { BottomSheet } from '@shared/ui';
import { useCallback, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ONBOARDING_RULES } from '../model/formatRule';
import { AgreementSection } from './AgreementSection';

export const OnBoardingForm = () => {
  const { submitOnboarding, isPending } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleInputChange =
    (name: keyof OnboardingInfo, formatter: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatter(e.target.value);
      setValue(name, formattedValue, { shouldValidate: true });
    };

  const handleClear = (name: keyof OnboardingInfo) => () => {
    setValue(name, '', { shouldValidate: true });
  };

  const onSubmit = async (data: OnboardingInfo) => {
    await submitOnboarding(data);
  };

  return (
    <div className="w-full h-full my-10 flex flex-col justify-between">
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="font-bold text-2xl flex flex-col gap-1">
            <h2>환영합니다!</h2>
            <div className="text-gray-600 font-light mt-2 text-base">
              <p className="mt-2 text-base font-light text-gray-600">
                서비스를 시작하기 전에 <br />
                간단한 정보를 입력해 주세요.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            <Input
              id={'birth'}
              label="생년월일"
              placeholder="00.00.00"
              {...register('birth', ONBOARDING_RULES.birth)}
              error={errors.birth?.message}
              onChange={handleInputChange('birth', formatBirth)}
              onClear={handleClear('birth')}
            />
            <Input
              id={'tel'}
              label="전화번호"
              placeholder="010-1234-5678"
              {...register('tel', ONBOARDING_RULES.tel)}
              error={errors.tel?.message}
              onChange={handleInputChange('tel', formatTel)}
              onClear={handleClear('tel')}
            />
          </div>
        </div>
      </form>

      <Button disabled={!isValid} onClick={openSheet}>
        다음
      </Button>

      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={closeSheet}>
          <AgreementSection isPending={isPending} onValidSubmit={handleSubmit(onSubmit)} />
        </BottomSheet>
      )}
    </div>
  );
};
