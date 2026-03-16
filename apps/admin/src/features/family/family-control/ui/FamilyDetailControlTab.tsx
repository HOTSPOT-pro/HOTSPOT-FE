import type { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary'; // 외부 라이브러리 권장
import { useFamilyDetailControl } from '@/domains/member-control';
import type { ApiErrorResponse } from '@/shared/api/types';
import { FamilyControlSection } from './FamilyControlSection';
import { FamilyDetailControlSkeleton } from './FamilyControlSkeleton';
import { FamilyOrderSection } from './FamilyOrderSection';

export const FamilyDetailControlTab = () => {
  const params = useParams();
  const familyId = Number(params.familyId);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        return (
          <div className="bg-white rounded-xl p-40 border border-red-100 flex flex-col items-center justify-center gap-12">
            <p className="text-gray-500 font-medium text-center">
              제어 정보를 불러오지 못했습니다. <br />
              <span className="text-xs text-red-400">
                {axiosError?.message || '알 수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요.'}
              </span>
            </p>
          </div>
        );
      }}
    >
      <Suspense fallback={<FamilyDetailControlSkeleton />}>
        <FamilyDetailContent familyId={familyId} />
      </Suspense>
    </ErrorBoundary>
  );
};

const FamilyDetailContent = ({ familyId }: { familyId: number }) => {
  const { familyControlData } = useFamilyDetailControl(familyId);
  if (!familyControlData) return null;

  return (
    <div className="flex flex-col gap-20">
      <FamilyOrderSection familyControlData={familyControlData} familyId={familyId} />
      <FamilyControlSection familyControlData={familyControlData} familyId={familyId} />
    </div>
  );
};
