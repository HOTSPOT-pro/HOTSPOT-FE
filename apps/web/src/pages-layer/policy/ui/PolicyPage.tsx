'use client';
import { useFamilyPolicy } from '@entities/policy';
import { Tab, type TabItem, useModal } from '@hotspot/ui/components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/entities/user';
import type { HeaderConfig } from '@/widgets/app-header/model/types';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';
import { OrderSection } from './OrderSection';
import { PolicyUserSection } from './PolicyUserSection';

type PolicyTabValue = 'FAMILY' | 'ORDER';
const POLICY_TABS: TabItem<PolicyTabValue>[] = [
  { label: '가족 정책', value: 'FAMILY' },
  { label: '우선순위 정책', value: 'ORDER' },
];

const HEADER_CONFIG: HeaderConfig = {
  leftAction: { type: 'back' },
  rightAction: { type: 'none' },
  title: '가족 정책',
  variant: 'sub',
};

export const PolicyPage = () => {
  const { policyPerFamily, priorityPerFamily } = useFamilyPolicy();
  const [activeTab, setActiveTab] = useState<PolicyTabValue>('FAMILY');
  const user = useUserStore();

  const { setHeader } = useSubHeaderStore();
  useEffect(() => {
    setHeader(HEADER_CONFIG);
  }, [setHeader]);

  if (!(policyPerFamily && priorityPerFamily) || user.familyRole === 'CHILD') {
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
          {activeTab === 'ORDER' && (
            <div className="px-5 py-4">
              <OrderSection data={priorityPerFamily} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};
