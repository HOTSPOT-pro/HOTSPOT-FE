'use client';

import { useParams } from 'next/navigation';
import { useFamilyDetailControl } from '@/domains/member-control';
import { FamilyControlSection } from './FamilyControlSection';
import { FamilyDetailControlSkeleton } from './FamilyControlSkeleton';
import { FamilyOrderSection } from './FamilyOrderSection';

export const FamilyDetailControlTab = () => {
  const params = useParams();
  const familyId = Number(params.familyId);

  const { familyControlData, isLoading, isError, errorMessage } = useFamilyDetailControl(familyId);

  if (isLoading) {
    return <FamilyDetailControlSkeleton />;
  }
  if (isError) {
    return (
      <div className="bg-white rounded-xl p-10 border border-red-100 flex flex-col items-center justify-center gap-3">
        <p className="text-gray-500 font-medium text-center">
          제어 정보를 불러오지 못했습니다.
          <br />
          <span className="text-xs text-red-400">{errorMessage}</span>
        </p>
      </div>
    );
  }

  if (!familyControlData) {
    return <div className="p-10 text-center text-gray-400">데이터가 존재하지 않습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <FamilyOrderSection familyControlData={familyControlData} familyId={familyId} />
      <FamilyControlSection familyControlData={familyControlData} familyId={familyId} />
    </div>
  );
};
