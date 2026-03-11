'use client';

import { Input } from '@hotspot/ui/components';
import { formatBirth, formatTel } from '@shared/lib';
import type { ChangeEvent, FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ONBOARDING_RULES } from '../model/formatRule';
import type { OnboardingInfo } from '../model/types';

interface OnboardingSectionProps {
  formId: string;
  register: UseFormRegister<OnboardingInfo>;
  errors: FieldErrors<OnboardingInfo>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onInputChange: (
    name: keyof OnboardingInfo,
    formatter: (value: string) => string,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: (name: keyof OnboardingInfo) => () => void;
}

export const OnboardingSection = ({
  formId,
  register,
  errors,
  onSubmit,
  onInputChange,
  onClear,
}: OnboardingSectionProps) => {
  return (
    <div className="w-full">
      <form
        id={formId}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        onSubmit={onSubmit}
      >
        <div>
          <div className="flex flex-col gap-10">
            <Input
              id={'birth'}
              label="생년월일"
              placeholder="00.00.00"
              {...register('birth', ONBOARDING_RULES.birth)}
              error={errors.birth?.message}
              onChange={onInputChange('birth', formatBirth)}
              onClear={onClear('birth')}
            />
            <Input
              id={'tel'}
              label="전화번호"
              placeholder="010-1234-5678"
              {...register('tel', ONBOARDING_RULES.tel)}
              error={errors.tel?.message}
              onChange={onInputChange('tel', formatTel)}
              onClear={onClear('tel')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
