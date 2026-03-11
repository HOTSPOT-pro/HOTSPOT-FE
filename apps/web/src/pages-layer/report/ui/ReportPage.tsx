'use client';

import { Card } from '@hotspot/ui';
import { MonthDaySelector } from '@shared/ui';
import { PeriodReport } from '@widgets/report';
import { useEffect, useState } from 'react';
import { type ReportUser, useReportUsers } from '@/domains/report';
import { UserSelector } from '@/domains/user';
import { ServiceReport } from '@/widgets/report/ui/ServiceReport';

export const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState<'MONTH' | 'DAY'>('MONTH');
  const [selectedUser, setSelectedUser] = useState<ReportUser>({
    name: null,
    subId: null,
  });

  const { data: users = [], isLoading: isUsersLoading, isError: isUsersError } = useReportUsers();

  useEffect(() => {
    const firstUser = users[0];
    if (firstUser && selectedUser.subId === null) {
      setSelectedUser(firstUser);
    }
  }, [users, selectedUser.subId]);

  if (isUsersLoading || selectedUser.subId === null) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        구성원을 불러오는 중...
      </div>
    );
  }

  if (isUsersError) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        구성원 정보를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full pb-8 px-2 gap-2">
      {/* 월/일 선택 바 */}
      <div className="py-2">
        <MonthDaySelector onChange={(unit) => setSelectedTab(unit)} unit={selectedTab} />
      </div>
      {/* 구성원 선택 */}
      <UserSelector onSelect={setSelectedUser} selectedUser={selectedUser} users={users} />
      {/* 기간별 리포트 */}
      <Card>
        <PeriodReport unit={selectedTab} user={selectedUser} />
      </Card>
      <Card>
        <ServiceReport unit={selectedTab} user={selectedUser} />
      </Card>
    </div>
  );
};
