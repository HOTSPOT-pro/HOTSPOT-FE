'use client';

import { Modal } from '@hotspot/ui';
import { useCallback, useState } from 'react';
import { type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { ONBOARDING_RULES } from '@/features/onboarding/model/formatRule';
import { formatTel } from '@/shared/lib';

const ParentRoleIcon = () => (
  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" fill="currentColor" fillOpacity="0.14" r="11" />
    <circle cx="9.2" cy="10.2" fill="currentColor" r="1.2" />
    <circle cx="14.8" cy="10.2" fill="currentColor" r="1.2" />
    <path
      d="M9.6 14c.6.8 1.4 1.2 2.4 1.2s1.8-.4 2.4-1.2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </svg>
);

const ChildRoleIcon = () => (
  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" fill="currentColor" fillOpacity="0.1" r="11" />
    <circle cx="9.2" cy="10.2" fill="currentColor" r="1.2" />
    <circle cx="14.8" cy="10.2" fill="currentColor" r="1.2" />
    <path
      d="M9.8 14.4c.5.5 1.3.8 2.2.8.8 0 1.6-.3 2.2-.8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </svg>
);

const UploadIcon = () => (
  <svg aria-hidden="true" className="h-11 w-11 text-gray-500" fill="none" viewBox="0 0 48 48">
    <path
      d="M24 30V10m0 0-8 8m8-8 8 8M11 28v8a5 5 0 0 0 5 5h16a5 5 0 0 0 5-5v-8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.5"
    />
  </svg>
);

const InputField = ({
  errorMessage,
  helpText,
  inputProps,
  label,
  placeholder,
}: {
  errorMessage?: string;
  helpText: string;
  inputProps: UseFormRegisterReturn;
  label: string;
  placeholder: string;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-[1rem] font-semibold leading-none text-black">{label}</p>
      <input
        {...inputProps}
        className="h-12 w-full border-b border-gray-200 bg-transparent text-[1rem] text-gray-900 outline-none placeholder:text-gray-400"
        placeholder={placeholder}
        type="text"
      />
      <p
        className={`pt-2 text-[0.75rem] leading-none ${
          errorMessage ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        {errorMessage ?? helpText}
      </p>
    </div>
  );
};

export const AddFamilyMemberModal = ({
  close,
}: {
  close: () => void;
  props?: Record<string, unknown>;
}) => {
  const [selectedRole, setSelectedRole] = useState<'PARENT' | 'CHILD'>('PARENT');

  const {
    formState: { errors, isValid },
    register,
    setValue,
  } = useForm<{
    email: string;
    familyRole: 'PARENT' | 'CHILD';
    name: string;
    tel: string;
  }>({
    defaultValues: {
      email: '',
      familyRole: 'PARENT',
      name: '',
      tel: '',
    },
    mode: 'onChange',
  });

  const handleTelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatTel(e.target.value);
      setValue('tel', formatted, { shouldValidate: true });
    },
    [setValue],
  );

  const handleSelectRole = useCallback(
    (role: 'PARENT' | 'CHILD') => {
      setSelectedRole(role);
      setValue('familyRole', role, { shouldValidate: true });
    },
    [setValue],
  );

  return (
    <Modal
      className="w-[30.5rem] max-w-[calc(100vw-1rem)] max-h-[92vh] overflow-y-auto rounded-[1.5rem] p-6"
      size="custom"
    >
      <Modal.Header className="gap-2">
        <Modal.Title className="text-[1rem] font-bold leading-tight text-black">
          가족 구성원 추가 신청
        </Modal.Title>
        <Modal.Description className="text-[0.875rem] text-gray-500">
          신청 후 검토를 거쳐 구성원이 추가됩니다
        </Modal.Description>
      </Modal.Header>

      <Modal.Content className="mt-2 gap-6">
        <input {...register('familyRole', { required: '필수 입력 항목입니다.' })} type="hidden" />

        <InputField
          errorMessage={errors.name?.message}
          helpText="이름을 입력해주세요."
          inputProps={register('name', {
            minLength: { message: '2자 이상 입력해주세요.', value: 2 },
            required: '필수 입력 항목입니다.',
          })}
          label="이름"
          placeholder="구성원 이름"
        />
        <InputField
          errorMessage={errors.email?.message}
          helpText="이메일을 입력해주세요."
          inputProps={register('email', {
            pattern: {
              message: '올바른 이메일 형식이 아닙니다.',
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            },
            required: '필수 입력 항목입니다.',
          })}
          label="이메일"
          placeholder="example@email.com"
        />
        <InputField
          errorMessage={errors.tel?.message}
          helpText="전화번호를 입력해주세요."
          inputProps={register('tel', {
            ...ONBOARDING_RULES.tel,
            onChange: handleTelChange,
          })}
          label="전화번호"
          placeholder="010-0000-0000"
        />

        <div className="space-y-3">
          <p className="text-[1rem] font-semibold leading-none text-black">권한</p>
          <div className="flex gap-2">
            <button
              className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border text-[1rem] font-medium ${
                selectedRole === 'PARENT'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-500'
              }`}
              onClick={() => handleSelectRole('PARENT')}
              type="button"
            >
              <ParentRoleIcon />
              부모
            </button>
            <button
              className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border text-[1rem] font-medium ${
                selectedRole === 'CHILD'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-500'
              }`}
              onClick={() => handleSelectRole('CHILD')}
              type="button"
            >
              <ChildRoleIcon />
              자녀
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[1rem] font-semibold leading-none text-black">가족관계증명서</p>
          <label className="flex h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-gray-50/40">
            <UploadIcon />
            <p className="text-[0.75rem] text-gray-600">파일을 선택하거나 드래그하세요</p>
            <p className="text-[0.5rem] text-gray-500">PDF, JPG, PNG (최대 10MB)</p>
            <input className="hidden" type="file" />
          </label>
        </div>
      </Modal.Content>

      <Modal.Footer btnLayout="horizontal" className="mt-2 gap-2">
        <button
          className="h-12 flex-1 rounded-lg bg-gray-300 text-[1rem] font-semibold text-white disabled:opacity-100"
          disabled={!isValid}
          type="button"
        >
          추가 신청
        </button>
        <button
          className="h-12 flex-1 rounded-lg border border-gray-200 bg-white text-[1rem] font-semibold text-gray-400"
          onClick={close}
          type="button"
        >
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
};
