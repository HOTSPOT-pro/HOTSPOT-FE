'use client';

import type { OnboardingInput } from '@entities/user';
import { useUserStore } from '@features/auth';
import { Button, Input } from '@hotspot/ui/components';
import { BottomSheet } from '@shared/ui';
import { useCallback, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatBirth, formatTel } from '../lib/format';
import { ONBOARDING_RULES } from '../model/formatRule';
import { AgreementSection } from './AgreementSection';

export const OnBoardingForm = () => {
  const { userName } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const formId = useId();

  const openSheet = useCallback(() => setIsOpen(true), []);
  const closeSheet = useCallback(() => setIsOpen(false), []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<OnboardingInput>({
    defaultValues: { birth: '', tel: '' },
    mode: 'onChange',
  });

  const handleInputChange =
    (name: keyof OnboardingInput, formatter: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatter(e.target.value);
      setValue(name, formattedValue, { shouldValidate: true });
    };

  const onSubmit = (data: OnboardingInput) => console.log('제출 데이터:', data);

  return (
    <div className="w-full h-full my-10 flex flex-col justify-between">
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="font-bold text-2xl flex flex-col gap-1">
            <p>환영합니다!</p>
            <p>{userName ?? '사용자'}님</p>
            <div className="text-gray-600 font-light mt-2 text-base">
              <p>서비스를 시작하기 전에</p>
              <p>간단한 정보를 입력해 주세요.</p>
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
            />
            <Input
              id={'tel'}
              label="전화번호"
              placeholder="010-1234-5678"
              {...register('tel', ONBOARDING_RULES.tel)}
              error={errors.tel?.message}
              onChange={handleInputChange('tel', formatTel)}
            />
          </div>
        </div>
      </form>

      <Button disabled={!isValid} onClick={openSheet}>
        다음
      </Button>

      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={closeSheet}>
          <AgreementSection formId={formId} />
        </BottomSheet>
      )}
    </div>
  );
};
