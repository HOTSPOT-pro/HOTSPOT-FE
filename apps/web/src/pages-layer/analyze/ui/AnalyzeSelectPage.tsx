'use client';

import { Button } from '@hotspot/ui';
import { useRouter } from 'next/navigation';
import { UserProfileIcon } from '@/domains/user';
import type { UserRole } from '@/domains/user/model/types';

const Temp: { subId: number; name: string; role: UserRole }[] = [
  { name: '이재', role: 'CHILD', subId: 1 },
  { name: '이규동', role: 'CHILD', subId: 2 },
  { name: '김경민', role: 'CHILD', subId: 3 },
  { name: '신형서', role: 'CHILD', subId: 4 },
  { name: '채지연', role: 'PARENT', subId: 5 },
  { name: '박승연', role: 'OWNER', subId: 6 },
];

export const AnalyzeSelectPage = () => {
  const router = useRouter();
  const handleHistory = (subId: number) => {
    router.push(`/analyze/${subId}/history`);
  };
  const handleThisWeekReport = (subId: number) => {
    router.push(`/analyze/${subId}/report`);
  };

  return (
    <div className="px-6 py-4 flex flex-col gap-4">
      <h2 className="text-[19px] font-semibold">리포트 대상</h2>
      <p className="text-[13px] font-normal text-gray-600">
        분석 리포트를 보려는 대상을 선택해주세요.
      </p>

      <div className="flex flex-col gap-3 justify-center">
        {Temp.map((i) => (
          <div className="p-4 shadow-sm flex flex-row rounded-2xl items-center gap-2" key={i.subId}>
            <UserProfileIcon type={i.role} />
            <p className="text-[13px] font-medium w-full">{i.name}</p>
            <Button
              className="w-fit h-fit p-1"
              onClick={() => handleHistory(i.subId)}
              variant="ghost"
            >
              히스토리
            </Button>
            <Button className="w-fit h-fit p-1" onClick={() => handleThisWeekReport(i.subId)}>
              이번주 분석
            </Button>
          </div>
        ))}
      </div>

      <span className="text-[12px] font-light text-gray-600">구독 취소하기</span>
    </div>
  );
};
