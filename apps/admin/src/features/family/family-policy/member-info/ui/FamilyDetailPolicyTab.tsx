'use client';

import { useModal } from '@hotspot/ui';
import { useParams } from 'next/navigation';
import { type ReactNode, useCallback } from 'react';
import type { FamilyPolicy } from '@/domains/family';
import { useFamilyDetailPolicy } from '@/domains/member-policy';
import { FamilyPolicyCard } from './FamilyPolicyCard';
import { FamilyPolicyCardSkeleton } from './FamilyPolicyCardSkeleton';

const PolicyTabLayout = ({ children }: { children: ReactNode }) => (
  <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] px-20 py-16 flex flex-col gap-8">
    <h3 className="font-body-body2-bold">구성원별 정책 적용 현황</h3>
    {children}
  </div>
);

export const FamilyDetailPolicyTab = () => {
  const params = useParams();
  const familyId = Number(params.familyId);
  const { familyPolicyData, isLoading, isError, errorMessage } = useFamilyDetailPolicy(familyId);
  const { open } = useModal();

  const handleOpenModal = useCallback(
    (member: FamilyPolicy) => {
      open('policyDetailModal', {
        props: { familyId, member },
      });
    },
    [open, familyId],
  );
  if (isLoading) {
    return (
      <PolicyTabLayout>
        <div className="flex flex-col gap-12 mt-4">
          <FamilyPolicyCardSkeleton />
          <FamilyPolicyCardSkeleton />
        </div>
      </PolicyTabLayout>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl p-40 border border-red-100 flex flex-col items-center justify-center gap-12">
        <p className="text-gray-500 font-medium text-center">
          정책 정보를 불러오지 못했습니다.
          <br />
          <span className="text-xs text-red-500">{errorMessage}</span>
        </p>
      </div>
    );
  }

  return (
    <PolicyTabLayout>
      <div className="flex flex-col gap-8">
        {familyPolicyData?.map((member) => (
          <FamilyPolicyCard handleOpenModal={handleOpenModal} key={member.subId} member={member} />
        ))}
        {familyPolicyData?.length === 0 && (
          <div className="py-40 text-center text-gray-400">등록된 정책이 없습니다.</div>
        )}
      </div>
    </PolicyTabLayout>
  );
};
