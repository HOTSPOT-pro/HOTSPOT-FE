'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type Policy, usePolicy } from '@/domains/policy';
import type { DAYS, GetFamilyCustomPolicy, PolicySnapshot } from '../model/types';
import { useAddFamilyPolicy } from '../model/useAddFamilyPolicy';
import { useEditFamilyPolicy } from '../model/useEditFamilyPolicy';
import { PolicyAddForm } from './PolicyAddForm';
import { PolicyAdminItem } from './PolicyAdminItem';

interface PolicyFormValues {
  name: string;
  description: string;
  type: 'SCHEDULED' | 'ONCE';
  selectedDays: DAYS[];
  startTime: string;
  endTime: string;
  duration: string;
  isActive: boolean;
}

export const AddPolicyModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const props = getProps<{ initialData: GetFamilyCustomPolicy }>();
  const initialData = props?.initialData;

  const isEditMode = Boolean(initialData);
  const { mutate: addMutate, isPending: isAddPending } = useAddFamilyPolicy();
  const { mutate: editMutate, isPending: isEditPending } = useEditFamilyPolicy();
  const isPending = isAddPending || isEditPending;

  const [step, setStep] = useState<'form' | 'list'>('form');
  const { policyList } = usePolicy();

  const handleSelectTemplate = (policy: Policy) => {
    setValue('name', policy.name);
    setValue('description', policy.policyDescription);
    setValue('type', policy.policyType as 'SCHEDULED' | 'ONCE');
    const { days, startTime, endTime, durationMinutes } = policy.policySnapshot;
    setValue('selectedDays', (days as DAYS[]) || []);
    setValue('startTime', startTime || '');
    setValue('endTime', endTime || '');
    setValue('duration', durationMinutes ? String(durationMinutes) : '');
    setStep('form');
  };

  const methods = useForm<PolicyFormValues>({
    defaultValues: initialData
      ? {
          description: initialData.policyDescription,
          duration: initialData.policySnapshot.durationMinutes
            ? String(initialData.policySnapshot.durationMinutes)
            : '',
          endTime: initialData.policySnapshot.endTime || '',
          isActive: initialData.isActive,
          name: initialData.name,
          selectedDays: (initialData.policySnapshot.days as DAYS[]) || [],
          startTime: initialData.policySnapshot.startTime || '',
          type: initialData.policyType as 'SCHEDULED' | 'ONCE',
        }
      : {
          description: '',
          duration: '',
          endTime: '',
          isActive: true,
          name: '',
          selectedDays: [],
          startTime: '',
          type: 'SCHEDULED',
        },
    mode: 'onChange',
  });
  const { handleSubmit, setValue, watch } = methods;

  // 조건부 저장 로직 (onSubmit)
  const onSave = (data: PolicyFormValues) => {
    const snapshot: Partial<PolicySnapshot> = {};

    if (data.type === 'SCHEDULED') {
      snapshot.days = data.selectedDays;
      snapshot.startTime = data.startTime;
      snapshot.endTime = data.endTime;
    } else {
      if (data.duration) {
        snapshot.durationMinutes = Number(data.duration);
      } else if (data.startTime && data.endTime) {
        snapshot.startTime = data.startTime;
        snapshot.endTime = data.endTime;
      }
    }

    const payload = {
      isActive: data.isActive,
      name: data.name,
      policyDescription: data.description,
      policySnapshot: snapshot,
      policyType: data.type,
    };

    if (isEditMode && initialData) {
      editMutate({ blockPolicyId: initialData.id, request: payload }, { onSuccess: close });
    } else {
      addMutate(payload, { onSuccess: close });
    }
  };

  // 전체 폼 유효성 체크
  const isFormValid = () => {
    const values = watch();
    if (!(values.name && values.description)) return false;
    if (values.type === 'SCHEDULED') {
      return Boolean(values.startTime) && Boolean(values.endTime);
    }
    const hasDuration = Number(values.duration) > 0;
    const hasTimeRange = Boolean(values.startTime) && Boolean(values.endTime);
    return hasDuration || hasTimeRange;
  };

  return (
    <Modal className="w-100 max-h-200 overflow-auto">
      <Modal.Header className="flex flex-row justify-between items-center">
        <Modal.Title>{step === 'form' ? '시간대별 정책 생성' : '정책 템플릿 선택'}</Modal.Title>
        <Button
          className="w-fit h-fit px-4 py-2"
          onClick={() => setStep(step === 'form' ? 'list' : 'form')}
          variant={step === 'list' ? 'ghost' : 'outline'}
        >
          {step === 'list' ? '뒤로가기' : '템플릿 가져오기'}
        </Button>
      </Modal.Header>

      <Modal.Content>
        <FormProvider {...methods}>
          {step === 'form' ? (
            <PolicyAddForm />
          ) : (
            <div className="flex flex-col gap-2 h-150 overflow-auto p-1">
              <p className="text-sm text-gray-500 pb-2">가져올 정책을 선택해 보세요.</p>
              {policyList.map((policy) => (
                <PolicyAdminItem
                  key={policy.id}
                  onSelect={() => handleSelectTemplate(policy)}
                  policy={policy}
                />
              ))}
            </div>
          )}
        </FormProvider>
      </Modal.Content>

      <Modal.Footer className="flex gap-2 flex-row">
        <Button onClick={close} variant="ghost">
          취소
        </Button>
        <Button
          disabled={isPending || !isFormValid()}
          isLoading={isPending}
          onClick={handleSubmit(onSave)}
        >
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
