'use client';
import { usePolicy } from '@entities/policy';
import { Tab, type TabItem, useModal } from '@hotspot/ui/components';
import { OrderSection, PolicyUserSection } from '@widgets/policy';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/entities/user';
import type { HeaderConfig } from '@/widgets/app-header/model/types';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';

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
  const router = useRouter();
  const { policyPerFamily, loading } = usePolicy();
  const [activeTab, setActiveTab] = useState<PolicyTabValue>('FAMILY');
  const user = useUserStore();
  const { open } = useModal();

  const { setHeader } = useSubHeaderStore();
  useEffect(() => {
    setHeader(HEADER_CONFIG);
  }, [setHeader]);

  useEffect(() => {
    if (loading) return;
    if (!policyPerFamily || user.familyRole === 'CHILD') {
      open('errorModal', {
        props: {
          content: '부모 계정만 접근할 수 있는 페이지입니다.',
          onConfirm: () => router.replace('/'),
          title: '접근 권한 없음',
        },
      });
    }
  }, [loading, policyPerFamily, user.familyRole, open, router]);

  if (!policyPerFamily || user.familyRole === 'CHILD') {
    return null;
  }

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
          {activeTab === 'FAMILY' && <PolicyUserSection data={policyPerFamily} />}
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
