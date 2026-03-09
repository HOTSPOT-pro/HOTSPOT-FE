'use client';

import { Card } from '@hotspot/ui';
import { MonthDaySelector } from '@shared/ui';
import { PeriodReport } from '@widgets/report';
import { useEffect, useState } from 'react';
import { type ReportUser, useReportUsers } from '@/entities/report';
import { UserSelector } from '@/entities/user';
import { ServiceReport } from '@/widgets/report/ui/ServiceReport';

export const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState<'MONTH' | 'DAY'>('MONTH');
  const [selectedUser, setSelectedUser] = useState<ReportUser>({
    name: null,
    subId: null,
  });

  const { data: users = [] } = useReportUsers();

  useEffect(() => {
    const firstUser = users[0];
    if (firstUser && selectedUser.subId === null) {
      setSelectedUser(firstUser);
    }
  }, [users, selectedUser.subId]);

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
