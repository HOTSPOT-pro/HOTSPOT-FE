'use client';

import { Button, Input, Modal, Textarea } from '@hotspot/ui';
import { useForm } from 'react-hook-form';
import { type DAYS, useCreateTimePolicy } from '@/features/policy';

interface PolicyFormValues {
  name: string;
  description: string;
  type: 'SCHEDULED' | 'ONCE';
  selectedDays: DAYS[];
  startTime: string;
  endTime: string;
  duration: string;
}

const DAY_OPTIONS: { label: string; value: DAYS }[] = [
  { label: '월', value: 'MONDAY' },
  { label: '화', value: 'TUESDAY' },
  { label: '수', value: 'WEDNESDAY' },
  { label: '목', value: 'THURSDAY' },
  { label: '금', value: 'FRIDAY' },
  { label: '토', value: 'SATURDAY' },
  { label: '일', value: 'SUNDAY' },
];

export const PolicyAddTimeModal = ({ close }: { close: () => void }) => {
  const { mutate, isPending } = useCreateTimePolicy();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PolicyFormValues>({
    defaultValues: {
      description: '',
      duration: '',
      name: '',
      selectedDays: [],
      type: 'SCHEDULED',
    },
    mode: 'onChange', // 실시간 버튼 활성화 체크를 위해 설정
  });

  const currentType = watch('type');
  const selectedDays = watch('selectedDays');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const duration = watch('duration');

  const handleDurationChange = (val: string) => {
    setValue('duration', val);
    if (val.trim() !== '') {
      setValue('startTime', '');
      setValue('endTime', '');
    }
  };
  const handleTimeChange = (field: 'startTime' | 'endTime', val: string) => {
    setValue(field, val);
    if (val !== '') {
      setValue('duration', '');
    }
  };

  // 조건부 저장 로직 (onSubmit)
  const onSave = (data: PolicyFormValues) => {
    const snapshot: any = {};

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

    mutate(
      {
        policyDescription: data.description,
        policyName: data.name,
        policySnapshot: snapshot,
        policyType: data.type,
      },
      { onSuccess: () => close() },
    );
  };

  // 전체 폼 유효성 체크
  const isFormValid = () => {
    if (!(watch('name') && watch('description'))) return false;

    if (currentType === 'SCHEDULED') {
      return selectedDays.length > 0 && Boolean(startTime) && Boolean(endTime);
    }
    const hasDuration = Number(duration) > 0;
    const hasTimeRange = Boolean(startTime) && Boolean(endTime);
    return hasDuration || hasTimeRange;
  };

  return (
    <Modal className="w-122">
      <Modal.Header>
        <Modal.Title>시간대별 정책 생성</Modal.Title>
      </Modal.Header>

      <Modal.Content className="flex flex-col gap-20">
        <Input
          id="name"
          label="정책명"
          placeholder="예: 취침 시간 차단"
          {...register('name', { required: '정책명은 필수입니다.' })}
          error={errors.name?.message}
        />
        <Textarea
          id="description"
          label="설명"
          placeholder="예: 매일 지정한 수면 시간 동안 앱 사용을 제한해 규칙적인 생활을 돕는 정책입니다."
          {...register('description', { required: '정책 설명은 필수입니다.' })}
          error={errors.description?.message}
        />

        <div className="flex flex-col gap-8">
          <p className="font-body-body2-bold text-gray-700">정책 유형</p>
          <div className="flex gap-8">
            <Button
              className="flex-1"
              onClick={() => {
                setValue('type', 'SCHEDULED', { shouldValidate: true });
                setValue('duration', '');
              }}
              type="button"
              variant={currentType === 'SCHEDULED' ? 'solid' : 'outline'}
            >
              반복 일정
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setValue('type', 'ONCE', { shouldValidate: true });
                setValue('selectedDays', []);
              }}
              type="button"
              variant={currentType === 'ONCE' ? 'solid' : 'outline'}
            >
              일회성
            </Button>
          </div>
        </div>

        <hr className="border-gray-100" />

        {currentType === 'SCHEDULED' ? (
          <div className="flex flex-col gap-16 bg-gray-50 p-16 rounded-xl">
            <div className="flex flex-col gap-12">
              <p className="font-body-body3-bold text-gray-500 uppercase">반복 요일 선택</p>
              <div className="flex flex-wrap gap-8">
                {DAY_OPTIONS.map((day) => {
                  const isSelected = selectedDays.includes(day.value);
                  return (
                    <button
                      className={`px-12 py-8 rounded-lg font-body-body3 transition-colors ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                      key={day.value}
                      onClick={() => {
                        const next = isSelected
                          ? selectedDays.filter((d) => d !== day.value)
                          : [...selectedDays, day.value];
                        setValue('selectedDays', next, { shouldValidate: true });
                      }}
                      type="button"
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16 mt-8">
              <Input id="startTime" label="시작 시간" type="time" {...register('startTime')} />
              <Input id="endTime" label="종료 시간" type="time" {...register('endTime')} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-16 bg-gray-50 p-16 rounded-xl">
            <Input
              id="duration"
              label="차단 기간 (분)"
              placeholder="예: 60"
              type="number"
              {...register('duration')}
              onChange={(e) => handleDurationChange(e.target.value)}
              value={duration}
            />

            <div className="flex items-center gap-12 py-4">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-[10px] text-gray-400 font-bold">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-16">
              <Input
                id="startTime"
                label="시작 시간"
                type="time"
                {...register('startTime')}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                value={startTime}
              />
              <Input
                id="endTime"
                label="종료 시간"
                type="time"
                {...register('endTime')}
                onChange={(e) => handleTimeChange('endTime', e.target.value)}
                value={endTime}
              />
            </div>
            {/* 안내 문구 추가 (선택) */}
            <p className="text-[11px] text-gray-400 mt-1">
              * 차단 기간과 시작/종료 시간 둘 중 하나만 입력 가능합니다.
            </p>
          </div>
        )}
      </Modal.Content>

      <Modal.Footer className="flex gap-8 flex-row">
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
