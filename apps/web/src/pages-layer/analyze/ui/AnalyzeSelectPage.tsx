'use client';
import { Button } from '@hotspot/ui';
import { useForm } from 'react-hook-form';
import type { DAYS } from '@/features/policy/policy-list/model/types';

const DAY_OPTIONS: { label: string; value: DAYS }[] = [
  { label: '월', value: 'MONDAY' },
  { label: '화', value: 'TUESDAY' },
  { label: '수', value: 'WEDNESDAY' },
  { label: '목', value: 'THURSDAY' },
  { label: '금', value: 'FRIDAY' },
  { label: '토', value: 'SATURDAY' },
  { label: '일', value: 'SUNDAY' },
];

export const AnalyzeSelectPage = () => {
  const { watch, setValue } = useForm();
  const selectedDays = watch('selectedDays') || [];

  return (
    <div className="px-6 py-4 flex flex-col gap-4">
      <div id="리포트 수령 섹션">
        <h2 className="text-[19px] font-semibold">리포트 수령일</h2>
        <p className="text-[13px] font-normal text-gray-600">
          수령일 전날을 기준으로 리포트를 생성합니다.
        </p>
        <div className="flex flex-row gap-4 pt-2 items-center justify-between w-full">
          <div className="flex flex-row gap-2">
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
          <Button className="h-fit px-3 py-2">편집</Button>
        </div>
      </div>

      <div id="리포트 대상 섹션">
        <h2 className="text-[19px] font-semibold">리포트 대상</h2>
        <p className="text-[13px] font-normal text-gray-600">
          분석 리포트를 보려는 대상을 선택해주세요.
        </p>
      </div>
      <span className="text-[12px] font-light text-gray-600">구독 취소하기</span>
    </div>
  );
};
