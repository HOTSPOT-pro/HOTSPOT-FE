'use client';

import { Tab, type TabItem } from '@hotspot/ui';
import { useEffect, useState } from 'react';
import { PresentTab } from '@/features/gift/present-data';
import { PresentLogList } from '@/features/gift/present-log';
import type { HeaderConfig } from '@/widgets/app-header/model/types';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';

type GiftTabValue = 'GIFT' | 'SEND_LOG' | 'RECIEVE_LOG';
const POLICY_TABS: TabItem<GiftTabValue>[] = [
  { label: '선물하기', value: 'GIFT' },
  { label: '보낸 내역', value: 'SEND_LOG' },
  { label: '받은 내역', value: 'RECIEVE_LOG' },
];

const HEADER_CONFIG: HeaderConfig = {
  leftAction: { type: 'back' },
  rightAction: { type: 'none' },
  title: '데이터 선물',
  variant: 'sub',
};

export const GiftPage = () => {
  const [activeTab, setActiveTab] = useState<GiftTabValue>('GIFT');

  const { setHeader } = useSubHeaderStore();
  useEffect(() => {
    setHeader(HEADER_CONFIG);
  }, [setHeader]);

  return (
    <>
      <nav>
        <Tab<GiftTabValue>
          activeValue={activeTab}
          items={POLICY_TABS}
          onTabChange={setActiveTab}
          variant="underline"
        />
      </nav>

      <main className="w-full px-16 pt-16 pb-32">
        <div className="rounded-3xl bg-white">
          {activeTab === 'GIFT' && <PresentTab />}
          {activeTab === 'SEND_LOG' && <PresentLogList type="SEND" />}
          {activeTab === 'RECIEVE_LOG' && <PresentLogList type="RECEIVE" />}
        </div>
      </main>
    </>
  );
};
