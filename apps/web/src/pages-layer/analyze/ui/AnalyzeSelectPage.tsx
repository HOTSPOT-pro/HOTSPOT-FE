'use client';

import { Button, useModal } from '@hotspot/ui';
import { useRouter } from 'next/navigation';
import { useAnalyzeMember } from '@/domains/analyze';
import { UserProfileIcon } from '@/domains/user';
import type { UserRole } from '@/domains/user/model/types';
import { useDeleteSubscribe } from '@/features/analyze/model/useDeleteSubscribe';

export const AnalyzeSelectPage = () => {
  const { open } = useModal();
  const handleUpdateReceiveDay = () => {
    open('daySelectorModal', {
      props: {
        type: 'EDIT',
      },
    });
  };

  const { member } = useAnalyzeMember();

  const router = useRouter();
  const handleHistory = (subId: number) => {
    router.push(`/analyze/${subId}/history`);
  };
  const handleThisWeekReport = (subId: number, reportId: number) => {
    router.push(`/analyze/${subId}/${reportId}`);
  };

  const { cancelSubscribe } = useDeleteSubscribe();
  const handleCancelSubscribe = () => {
    cancelSubscribe.mutate();
  };

  return (
    <div className="px-6 py-4 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-[19px] font-semibold">리포트 대상</h2>
          <p className="text-[13px] font-normal text-gray-600">
            분석 리포트를 보려는 대상을 선택해주세요.
          </p>
        </div>
        <Button className="h-fit w-fit p-2" onClick={handleUpdateReceiveDay} variant="outline">
          수령일 변경
        </Button>
      </div>

      <div className="flex flex-col gap-3 justify-center">
        {member?.members.map((i) => (
          <div className="p-4 shadow-sm flex flex-row rounded-2xl items-center gap-2" key={i.subId}>
            <UserProfileIcon type={i.familyRole} />
            <p className="text-[13px] font-medium w-full">{i.name}</p>
            <Button
              className="w-fit h-fit p-1"
              onClick={() => handleHistory(i.subId)}
              variant="ghost"
            >
              히스토리
            </Button>
            <Button
              className="w-fit h-fit p-1"
              disabled={!i.reportId}
              onClick={() => {
                if (i.reportId) handleThisWeekReport(i.subId, i.reportId);
              }}
            >
              {i.reportId === null ? `이번주 미생성` : `이번주 분석`}
            </Button>
          </div>
        ))}
      </div>

      <button
        className="text-[12px] font-light text-gray-600"
        onClick={handleCancelSubscribe}
        type="button"
      >
        구독 취소하기
      </button>
    </div>
  );
};
