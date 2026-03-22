'use client';
import { Tab, type TabItem } from '@hotspot/ui';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Component, type ReactNode, Suspense, useState } from 'react';
import { useFamilyDetail } from '@/domains/family';
import { FamilyDetailControlTab } from '@/features/family/family-control';
import { FamilyDetailPolicyTab } from '@/features/family/family-policy/member-info';
import { FamilyRealtimeStatusTab } from '@/features/family/family-realtime-status';
import { FamilyRealtimeStatusSkeleton } from '@/features/family/family-realtime-status/ui/FamilyRealtimeStatusTabSkeleton';

type FamilyDetailTabValue = 'STATE' | 'POLICY' | 'CONTROL';
const FAMILY_DETAIL_TABS: TabItem<FamilyDetailTabValue>[] = [
  { label: '실시간 상태', value: 'STATE' },
  { label: '정책 적용 현황', value: 'POLICY' },
  { label: '제어 기능', value: 'CONTROL' },
];

interface StateTabErrorBoundaryProps {
  children: ReactNode;
  onRetry: () => void;
}

interface StateTabErrorBoundaryState {
  hasError: boolean;
}

class StateTabErrorBoundary extends Component<
  StateTabErrorBoundaryProps,
  StateTabErrorBoundaryState
> {
  public state: StateTabErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="elevation-1 bg-white rounded-xl px-20 py-16 flex flex-col gap-12">
          <p className="text-sm text-red-500">실시간 상태를 불러오지 못했습니다.</p>
          <button
            className="w-fit rounded-lg border border-gray-300 px-12 py-8 text-sm text-gray-700"
            onClick={() => {
              this.props.onRetry();
              this.setState({ hasError: false });
            }}
            type="button"
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const FamiliesDetailPage = () => {
  const params = useParams();
  const familyId = Number(params.familyId);
  const { familyData } = useFamilyDetail(familyId);
  const [activeTab, setActiveTab] = useState<FamilyDetailTabValue>('STATE');

  return (
    <div className="p-16 flex flex-col gap-20">
      <div className="elevation-1 p-16 bg-white rounded-xl">
        <div className="flex flex-row gap-10">
          <h1 className="font-title-title2-bold">{familyData?.representativeName} 가족</h1>
          <p className="rounded-full px-8 py-2 border border-gray-200 font-body-body5-bold flex items-center">
            {familyData?.displayId}
          </p>
        </div>
        <span className="font-body-body3 text-gray-600">
          {familyData?.phoneNumber} | 구성원 {familyData?.memberCount}명
        </span>
      </div>
      <nav>
        <Tab<FamilyDetailTabValue>
          activeValue={activeTab}
          items={FAMILY_DETAIL_TABS}
          onTabChange={setActiveTab}
          variant="segment"
        />
      </nav>
      <main className="w-full">
        {activeTab === 'STATE' && (
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <StateTabErrorBoundary key={`state-${familyId}`} onRetry={reset}>
                <Suspense fallback={<FamilyRealtimeStatusSkeleton />}>
                  <FamilyRealtimeStatusTab />
                </Suspense>
              </StateTabErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        )}
        {activeTab === 'POLICY' && <FamilyDetailPolicyTab />}
        {activeTab === 'CONTROL' && <FamilyDetailControlTab />}
      </main>
    </div>
  );
};
