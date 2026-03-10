'use client';
import { useFamilyAppliedPolicy } from '@entities/policy';
import { Tab, type TabItem } from '@hotspot/ui/components';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/entities/user';
import type { HeaderConfig } from '@/widgets/app-header/model/types';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';
import { PolicyManageSection } from './PolicyManageSection';
import { PolicyUserSection } from './PolicyUserSection';

type PolicyTabValue = 'FAMILY' | 'MANAGE';
const POLICY_TABS: TabItem<PolicyTabValue>[] = [
  { label: '가족 정책', value: 'FAMILY' },
  { label: '정책 관리', value: 'MANAGE' },
];

const HEADER_CONFIG: HeaderConfig = {
  leftAction: { type: 'back' },
  rightAction: { type: 'none' },
  title: '가족 정책',
  variant: 'sub',
};

export const PolicyPage = () => {
  const { policyPerFamily } = useFamilyAppliedPolicy();
  const [activeTab, setActiveTab] = useState<PolicyTabValue>('FAMILY');
  const user = useUserStore();

  const { setHeader } = useSubHeaderStore();
  useEffect(() => {
    setHeader(HEADER_CONFIG);
  }, [setHeader]);

  if (!policyPerFamily || user.familyRole === 'CHILD') {
    return null;
  }

  return (
    <>
      <nav>
        <Tab<PolicyTabValue>
          activeValue={activeTab}
          items={POLICY_TABS}
          onTabChange={setActiveTab}
          variant="underline"
        />
      </nav>

      <main className="w-full px-4 py-4">
        <div className="rounded-3xl bg-white">
          {activeTab === 'FAMILY' && <PolicyUserSection data={policyPerFamily} />}
          {activeTab === 'MANAGE' && (
            <div className="px-5 py-4">
              <PolicyManageSection />
            </div>
          )}
        </div>
      </main>
    </>
  );
};
