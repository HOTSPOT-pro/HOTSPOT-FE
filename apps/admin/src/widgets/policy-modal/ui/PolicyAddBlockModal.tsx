'use client';

import { Button, Input, Modal } from '@hotspot/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateAppPolicy } from '@/features/policy';

interface PolicyBlockFormValues {
  policyName: string;
  policyCode: string;
}

export const PolicyAddBlockModal = ({ close }: { close: () => void }) => {
  const { mutate, isPending } = useCreateAppPolicy();

  // react-hook-form 초기화
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PolicyBlockFormValues>({
    defaultValues: {
      policyCode: '',
      policyName: '',
    },
    mode: 'onChange',
  });

  const onSave = (data: PolicyBlockFormValues) => {
    mutate(data, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Modal className="w-122">
      <Modal.Header>
        <Modal.Title>차단 서비스 정책 생성</Modal.Title>
      </Modal.Header>

      <Modal.Content className="flex flex-col gap-24 py-16">
        <Input
          id="policyName"
          label="정책명"
          placeholder="예: 유튜브"
          {...register('policyName', {
            required: '정책명을 입력해주세요.',
            validate: (value) => value.trim() !== '' || '공백만 입력할 수 없습니다.',
          })}
          error={errors.policyName?.message}
        />
        <Input
          id="policyCode"
          label="정책 코드"
          placeholder="예: MEDIA_YOUTUBE"
          {...register('policyCode', {
            required: '정책 코드를 입력해주세요.',
            validate: (value) => value.trim() !== '' || '공백만 입력할 수 없습니다.',
          })}
          error={errors.policyCode?.message}
        />
      </Modal.Content>

      <Modal.Footer className="flex flex-row gap-8">
        <Button onClick={close} variant="ghost">
          취소
        </Button>
        <Button disabled={isPending || !isValid} onClick={handleSubmit(onSave)}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
