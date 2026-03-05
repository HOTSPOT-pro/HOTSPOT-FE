'use client';
import { useModal } from '@hotspot/ui';
import RightArrowIcon from '@hotspot/ui/assets/icons/arrow-right.svg';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import type { FamilyPolicy } from '@/domains/family';
import { useFamilyDetailPolicy } from '@/domains/member-policy';

export const FamilyDetailPolicyTab = () => {
  const params = useParams();
  const familyId = Number(params.familyId);
  const { familyPolicyData, isLoading } = useFamilyDetailPolicy(familyId);
  const { open } = useModal();

  const handleOpenModal = useCallback(
    (member: FamilyPolicy) => {
      open('policyDetailModal', {
        props: {
          familyId,
          member,
        },
      });
    },
    [open, familyId],
  );

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] px-5 py-4 flex flex-col gap-2">
      구성원별 정책 적용 현황
      {familyPolicyData?.map((member) => (
        <div className="px-4 py-3.5 rounded-xl border border-gray-200" key={member.subId}>
          <span className="flex flex-row justify-between">
            {member.memberName}
            <button onClick={() => handleOpenModal(member)} type="button">
              <RightArrowIcon className="w-6 h-6 text-black" />
            </button>
          </span>
          <span>{member.familyRole}</span>
          <span>{member.blocked}</span>
          <p>적용된 시간대별 정책</p>
          {member.appliedTimePolicies.map((i, index) => (
            <div key={index}>{i}</div>
          ))}
          <p>적용된 차단 서비스 정책</p>
          {member.appliedBlockedServicePolicies.map((i, index) => (
            <div key={index}>{i}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
