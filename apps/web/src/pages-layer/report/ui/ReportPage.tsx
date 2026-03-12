'use client';

import { Card } from '@hotspot/ui';
import { MonthDaySelector } from '@shared/ui';
import { PeriodReport, ServiceReport } from '@widgets/report';
import { useMemo, useState } from 'react';
import { type ReportUser, useReportUsers } from '@/domains/report';
import { UserSelector, useUserStore } from '@/domains/user';

export const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState<'MONTH' | 'DAY'>('MONTH');
  const [clickedUser, setClickedUser] = useState<ReportUser | null>(null);

  const loginUserId = useUserStore().subId;
  const { data: users = [], isLoading, isError } = useReportUsers();

  const sortedUsers = useMemo(() => {
    if (!loginUserId || users.length === 0) return users;
    return [...users].sort((a) => (a.subId === loginUserId ? -1 : 1));
  }, [users, loginUserId]);

  const selectedUser = clickedUser ?? sortedUsers[0];

  if (isLoading) return <div className="flex-center text-gray-400">구성원을 불러오는 중...</div>;
  if (isError) return <div className="flex-center text-gray-400">데이터 로드 실패</div>;
  if (!selectedUser) return null;

  return (
    <div className="flex flex-col w-full h-full pb-8 px-2 gap-2">
      <div className="py-2">
        <MonthDaySelector onChange={setSelectedTab} unit={selectedTab} />
      </div>

      <UserSelector onSelect={setClickedUser} selectedUser={selectedUser} users={sortedUsers} />

      <Card>
        <PeriodReport unit={selectedTab} user={selectedUser} />
      </Card>
      <Card>
        <ServiceReport unit={selectedTab} user={selectedUser} />
      </Card>
    </div>
  );
};
