'use client';
import { Tab, type TabItem } from '@hotspot/ui';
import { useParams } from 'next/navigation';
import { Component, type ReactNode, Suspense, useState } from 'react';
import { useFamilyDetail } from '@/domains/family';
import { FamilyDetailControlTab } from '@/features/family-control';
import { FamilyDetailPolicyTab } from '@/features/family-policy/member-info';
import { FamilyRealtimeStatusTab } from '@/features/family-realtime-status';

type FamilyDetailTabValue = 'STATE' | 'POLICY' | 'CONTROL';
const FAMILY_DETAIL_TABS: TabItem<FamilyDetailTabValue>[] = [
  { label: '실시간 상태', value: 'STATE' },
  { label: '정책 적용 현황', value: 'POLICY' },
  { label: '제어 기능', value: 'CONTROL' },
];

interface StateTabErrorBoundaryProps {
  children: ReactNode;
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
        <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] px-5 py-4 flex flex-col gap-3">
          <p className="text-sm text-red-500">실시간 상태를 불러오지 못했습니다.</p>
          <button
            className="w-fit rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
            onClick={() => {
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

const StateTabSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] px-5 py-4">
      <p className="text-sm text-gray-500">실시간 상태를 불러오는 중입니다.</p>
    </div>
  );
};

export const FamiliesDetailPage = () => {
  const params = useParams();
  const familyId = Number(params.familyId);
  const { familyData } = useFamilyDetail(familyId);
  const [activeTab, setActiveTab] = useState<FamilyDetailTabValue>('STATE');

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="p-4 bg-white rounded-xl shadow-xs">
        <div className="flex flex-row gap-2.5">
          <h1 className="text-[19px] font-bold">{familyData?.representativeName} 가족</h1>
          <p className="rounded-full px-2 py-0.5 border border-gray-200 text-[11px] font-bold flex items-center">
            {familyData?.displayId}
          </p>
        </div>
        <span className="text-[13px] font-normal text-gray-600">
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
          <StateTabErrorBoundary key={`state-${familyId}`}>
            <Suspense fallback={<StateTabSkeleton />}>
              <FamilyRealtimeStatusTab />
            </Suspense>
          </StateTabErrorBoundary>
        )}
        {activeTab === 'POLICY' && <FamilyDetailPolicyTab />}
        {activeTab === 'CONTROL' && <FamilyDetailControlTab />}
      </main>
    </div>
  );
};
