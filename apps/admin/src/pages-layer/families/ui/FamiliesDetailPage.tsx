'use client';
import { Tab, type TabItem } from '@hotspot/ui';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useFamilyDetail } from '@/domains/family';
import { FamilyDetailControlTab } from '@/features/family-control';
import { FamilyDetailPolicyTab } from '@/features/family-policy/member-info';

type FamilyDetailTabValue = 'STATE' | 'POLICY' | 'CONTROL';
const FAMILY_DETAIL_TABS: TabItem<FamilyDetailTabValue>[] = [
  { label: '실시간 상태', value: 'STATE' },
  { label: '정책 적용 현황', value: 'POLICY' },
  { label: '제어 기능', value: 'CONTROL' },
];

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
        {activeTab === 'STATE' && <div>실시간 상태</div>}
        {activeTab === 'POLICY' && <FamilyDetailPolicyTab />}
        {activeTab === 'CONTROL' && <FamilyDetailControlTab />}
      </main>
    </div>
  );
};
