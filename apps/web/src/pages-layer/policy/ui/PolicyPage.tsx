'use client';
import { PolicyUserCard, usePolicy } from '@entities/policy';
import { Tab, type TabItem } from '@hotspot/ui/components';
import { OrderSection } from '@widgets/policy';
import { useState } from 'react';

type PolicyTabValue = 'FAMILY' | 'ORDER';
const POLICY_TABS: TabItem<PolicyTabValue>[] = [
  { label: '가족 정책', value: 'FAMILY' },
  { label: '우선순위 정책', value: 'ORDER' },
];

export const PolicyPage = () => {
  const { data, loading } = usePolicy();
  const [activeTab, setActiveTab] = useState<PolicyTabValue>('FAMILY');

  if (loading) return '로딩중';

  return (
    <div>
      <nav>
        <Tab<PolicyTabValue>
          activeValue={activeTab}
          items={POLICY_TABS}
          onTabChange={setActiveTab}
          variant="underline"
        />
      </nav>

      <main className="w-full px-5 py-4">
        <div className="rounded-3xl bg-white">
          {activeTab === 'FAMILY' && (
            <div>
              {data.map((i) => (
                <PolicyUserCard
                  blockServices={i.blockServices}
                  id={i.id}
                  key={i.id}
                  limit={i.limit}
                  name={i.name}
                  policyList={i.policyList}
                />
              ))}
            </div>
          )}
          {activeTab === 'ORDER' && (
            <div className="px-5 py-4">
              <OrderSection />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
