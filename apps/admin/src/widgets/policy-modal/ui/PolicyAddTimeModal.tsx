'use client';

import { Button, Input, Modal } from '@hotspot/ui';
import { useState } from 'react';
import { type DAYS, type PostTimePolicyRequest, useCreateTimePolicy } from '@/features/policy';

const DAY_OPTIONS: { label: string; value: DAYS }[] = [
  { label: '월', value: 'MON' },
  { label: '화', value: 'TUE' },
  { label: '수', value: 'WED' },
  { label: '목', value: 'THU' },
  { label: '금', value: 'FRI' },
  { label: '토', value: 'SAT' },
  { label: '일', value: 'SUN' },
];

export const PolicyAddTimeModal = ({ close }: { close: () => void }) => {
  const { mutate, isPending } = useCreateTimePolicy();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'SCHEDULED' | 'ONCE'>('SCHEDULED');

  const [selectedDays, setSelectedDays] = useState<DAYS[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState<string>('');

  // 요일 선택/해제 토글 함수
  const toggleDay = (day: DAYS) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSave = async () => {
    const snapshot: PostTimePolicyRequest['policySnapshot'] = {};

    if (type === 'SCHEDULED') {
      if (selectedDays.length === 0 || !startTime || !endTime) {
        return;
      }
      snapshot.days = selectedDays;
      snapshot.startTime = startTime;
      snapshot.endTime = endTime;
    } else {
      const numDuration = Number(duration);
      const hasDuration = numDuration > 0;
      const hasTimeRange = startTime && endTime;

      if (!(hasDuration || hasTimeRange)) {
        return;
      }

      if (hasDuration) snapshot.durationMinutes = numDuration;
      if (hasTimeRange) {
        snapshot.startTime = startTime;
        snapshot.endTime = endTime;
      }
    }

    mutate(
      {
        policyDescription: description,
        policyName: name,
        policySnapshot: snapshot,
        policyType: type,
      },
      {
        onSuccess: () => close(),
      },
    );
  };

  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>시간대별 정책 생성</Modal.Title>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-5">
        <Input
          id="policyName"
          label="정책명"
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 취침 시간 차단"
          value={name}
        />
        <Input
          id="policyDescription"
          label="설명"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-gray-700">정책 유형</p>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => {
                setType('SCHEDULED');
                setDuration('');
              }}
              variant={type === 'SCHEDULED' ? 'solid' : 'outline'}
            >
              반복 일정
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setType('ONCE');
                setSelectedDays([]);
              }}
              variant={type === 'ONCE' ? 'solid' : 'outline'}
            >
              일회성
            </Button>
          </div>
        </div>

        <hr className="border-gray-100" />

        {type === 'SCHEDULED' ? (
          <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-gray-500 uppercase">
                반복 요일 선택 (중복 가능)
              </p>
              <div className="flex flex-wrap gap-2">
                {DAY_OPTIONS.map((day) => {
                  const isSelected = selectedDays.includes(day.value);
                  return (
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                      key={day.value}
                      onClick={() => toggleDay(day.value)}
                      type="button"
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input
                id="startTime"
                label="시작 시간"
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
                value={startTime}
              />
              <Input
                id="endTime"
                label="종료 시간"
                onChange={(e) => setEndTime(e.target.value)}
                type="time"
                value={endTime}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl">
            <Input
              id="blockDuration"
              label="차단 기간 (분)"
              onChange={(e) => setDuration(e.target.value)}
              placeholder="예: 60"
              type="number"
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
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
                value={startTime}
              />
              <Input
                id="endTime"
                label="종료 시간"
                onChange={(e) => setEndTime(e.target.value)}
                type="time"
                value={endTime}
              />
            </div>
          </div>
        )}
      </Modal.Content>
      <Modal.Footer className="flex gap-2">
        <Button className="flex-1" onClick={close} variant="ghost">
          취소
        </Button>
        <Button className="flex-1" disabled={isPending} onClick={handleSave}>
          {isPending ? '저장 중...' : '정책 저장'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
