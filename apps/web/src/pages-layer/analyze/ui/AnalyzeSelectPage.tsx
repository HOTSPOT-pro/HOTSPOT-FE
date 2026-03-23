'use client';

import { Button, useModal } from '@hotspot/ui';
import { useRouter } from 'next/navigation';
import { useAnalyzeMember } from '@/domains/analyze';
import { UserProfileIcon, UserRoleLabel, useUserStore } from '@/domains/user';

export const AnalyzeSelectPage = () => {
  const userRole = useUserStore().familyRole;
  const { open } = useModal();
  const handleUpdateReceiveDay = () => {
    open('daySelectorModal', {
      props: {
        defaultDay: member?.receiveDay,
        type: 'EDIT',
      },
    });
  };
  const handleCancelSubscribe = () => {
    open('cancelSubscribeModal');
  };

  const { member } = useAnalyzeMember();

  const router = useRouter();
  const handleHistory = (subId: number) => {
    router.push(`/analyze/${subId}/history`);
  };
  const handleThisWeekReport = (subId: number, reportId: number) => {
    router.push(`/analyze/${subId}/${reportId}`);
  };

  return (
    <div className="px-24 py-16 flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="font-title-title2-semibold">리포트 대상</h2>
          <p className="font-body-body3 text-gray-600">분석 리포트를 보려는 대상을 선택해주세요.</p>
        </div>
        {userRole === 'OWNER' && (
          <Button className="h-fit w-fit p-8" onClick={handleUpdateReceiveDay} variant="outline">
            수령일 변경
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-12 justify-center">
        {member?.members.map((i) => (
          <div
            className="p-16 shadow-sm flex flex-row rounded-2xl items-center gap-8"
            key={i.subId}
          >
            <UserProfileIcon type={i.familyRole} />
            <div className="flex flex-row w-full items-center gap-8">
              <p className="font-body-body3">{i.name}</p>
              <UserRoleLabel role={i.familyRole} />
            </div>
            <Button
              className="w-fit h-fit p-4 font-body-body5"
              onClick={() => handleHistory(i.subId)}
              variant="ghost"
            >
              히스토리
            </Button>
            <Button
              className="w-fit h-fit p-4 font-body-body5"
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

      {userRole === 'OWNER' && (
        <button
          className="text-[12px] font-light text-gray-600"
          onClick={handleCancelSubscribe}
          type="button"
        >
          구독 취소하기
        </button>
      )}
    </div>
  );
};
