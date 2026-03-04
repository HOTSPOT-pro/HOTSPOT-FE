'use client';

import { Button, Input } from '@hotspot/ui';
import { isAxiosError } from 'axios';
import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLoginMutation } from '@/features/login/model';
import { setAccessToken } from '@/shared/api/token';
import { getApiErrorMessage } from '@/shared/api/types';

const DEFAULT_ERROR_MESSAGE = '로그인에 실패했습니다. 관리자 키를 확인해주세요.';

interface LoginFormValues {
  adminCode: string;
}

export const LoginPage = () => {
  const adminKeyInputId = useId();
  const loginMutation = useLoginMutation();
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    watch,
  } = useForm<LoginFormValues>({
    defaultValues: {
      adminCode: '',
    },
    mode: 'onChange',
  });
  const adminCode = watch('adminCode');
  const isSubmitDisabled = !adminCode.trim() || isSubmitting;
  const inputError = errors.adminCode?.message ?? errors.root?.server?.message;

  const onSubmit = async ({ adminCode }: LoginFormValues) => {
    try {
      const result = await loginMutation.mutateAsync({
        adminCode: adminCode.trim(),
      });
      setAccessToken(result.data.accessToken);

      window.location.href = '/';
    } catch (error) {
      if (isAxiosError(error)) {
        setError('root.server', {
          message: getApiErrorMessage(error.response?.data, DEFAULT_ERROR_MESSAGE),
          type: 'server',
        });
      } else {
        setError('root.server', {
          message: DEFAULT_ERROR_MESSAGE,
          type: 'server',
        });
      }
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-150 h-100 flex flex-col shadow-2xl p-8 rounded-2xl gap-20">
        <div className="flex flex-col items-center text-center">
          {/* <Logo size="sm" /> */}
          <h1 className="text-[30px] font-bold">Hotspot Admin</h1>
        </div>
        <form className="flex flex-col h-full justify-between" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="adminCode"
            render={({ field }) => (
              <Input
                autoComplete="off"
                error={inputError}
                id={adminKeyInputId}
                label="관리자 키"
                onChange={(event) => {
                  if (errors.root?.server) {
                    clearErrors('root.server');
                  }
                  field.onChange(event.target.value);
                }}
                onClear={() => {
                  if (errors.root?.server) {
                    clearErrors('root.server');
                  }
                  field.onChange('');
                }}
                type="password"
                value={field.value}
              />
            )}
            rules={{
              required: '관리자 키를 입력해주세요.',
            }}
          />
          <Button disabled={isSubmitDisabled} isLoading={isSubmitting} type="submit">
            로그인
          </Button>
        </form>
      </div>
    </section>
  );
};
