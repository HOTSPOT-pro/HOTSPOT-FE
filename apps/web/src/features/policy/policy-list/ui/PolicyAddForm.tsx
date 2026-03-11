'use client';

import { Button, Input, Textarea, Toggle } from '@hotspot/ui';
import { useFormContext } from 'react-hook-form';
import type { DAYS } from '../model/types';

const DAY_OPTIONS: { label: string; value: DAYS }[] = [
  { label: '월', value: 'MONDAY' },
  { label: '화', value: 'TUESDAY' },
  { label: '수', value: 'WEDNESDAY' },
  { label: '목', value: 'THURSDAY' },
  { label: '금', value: 'FRIDAY' },
  { label: '토', value: 'SATURDAY' },
  { label: '일', value: 'SUNDAY' },
];

export const PolicyAddForm = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const currentType = watch('type');
  const selectedDays = watch('selectedDays') || [];
  const duration = watch('duration');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const isActive = watch('isActive');

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

  return (
    <div className="flex flex-col gap-5">
      <Input
        id="name"
        label="정책명"
        placeholder="예: 취침 시간 차단"
        {...register('name', { required: '정책명은 필수입니다.' })}
        error={errors.name?.message as string}
      />
      <Textarea
        className="placeholder:text-xs text-base"
        id="description"
        label="설명"
        placeholder="예: 매일 지정한 수면 시간 동안 앱 사용을 제한..."
        {...register('description', { required: '정책 설명은 필수입니다.' })}
        error={errors.description?.message as string}
      />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-gray-700">정책 유형</p>
        <div className="flex flex-row gap-2">
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
        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl">
          <p className="text-xs font-bold text-gray-500 uppercase">반복 요일 선택</p>
          <div className="flex flex-wrap gap-2">
            {DAY_OPTIONS.map((day) => {
              const isSelected = selectedDays.includes(day.value);
              return (
                <button
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    isSelected
                      ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                  key={day.value}
                  onClick={() => {
                    const next = isSelected
                      ? selectedDays.filter((d: string) => d !== day.value)
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
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Input id="startTime" label="시작 시간" type="time" {...register('startTime')} />
            <Input id="endTime" label="종료 시간" type="time" {...register('endTime')} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl">
          <Input
            id="duration"
            label="차단 기간 (분)"
            type="number"
            {...register('duration')}
            onChange={(e) => handleDurationChange(e.target.value)}
            value={duration}
          />
          <div className="flex items-center gap-3 py-1">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-[10px] text-gray-400 font-bold">OR</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
        </div>
      )}

      <div className="flex flex-row items-center justify-between py-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-gray-700">정책 활성화</p>
          <p className="text-xs text-gray-400">생성과 동시에 정책을 적용할까요?</p>
        </div>
        <Toggle
          checked={isActive}
          id="isActive"
          onChange={(checked) => setValue('isActive', checked)}
        />
      </div>
    </div>
  );
};
