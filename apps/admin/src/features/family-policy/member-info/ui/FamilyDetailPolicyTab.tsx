'use client';
import { useModal } from '@hotspot/ui';

import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import type { FamilyPolicy } from '@/domains/family';
import { useFamilyDetailPolicy } from '@/domains/member-policy';
import { FamilyPolicyCard } from './FamilyPolicyCard';

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
      <h3 className="text-[14px] font-bold">구성원별 정책 적용 현황</h3>
      {familyPolicyData?.map((member) => (
        <FamilyPolicyCard handleOpenModal={handleOpenModal} key={member.subId} member={member} />
      ))}
    </div>
  );
};
