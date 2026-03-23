'use client';

import { Card, Skeleton } from '@hotspot/ui';
import { MonthDaySelector } from '@shared/ui';
import { PeriodReport, ServiceReport } from '@widgets/report';
import { useMemo, useState } from 'react';
import { type ReportUser, useReportUsers } from '@/domains/report';
import { UserSelector, useUserStore } from '@/domains/user';

const ReportPageSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full pb-32 px-16 gap-16">
      <div className="rounded-2xl border border-gray-200 p-4">
        <Skeleton className="rounded-full" height={40} width="100%" />
      </div>

      <div className="flex gap-8 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton className="rounded-full shrink-0" height={36} key={`user-${index}`} width={72} />
        ))}
      </div>

      <Card>
        <div className="space-y-6">
          <Skeleton height={24} width={88} />
          <Skeleton height={20} width={120} />
          <Skeleton height={320} width="100%" />
        </div>
      </Card>

      <Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton height={24} width={120} />
            <Skeleton height={16} width={48} />
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex items-center gap-16" key={`service-${index}`}>
              <Skeleton className="rounded-full shrink-0" height={24} width={24} />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton height={16} width={96} />
                  <Skeleton height={16} width={48} />
                </div>
                <Skeleton height={10} width="100%" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

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

  if (isLoading) return <ReportPageSkeleton />;
  if (isError) return <div className="flex-center text-gray-400">데이터 로드 실패</div>;
  if (!selectedUser) return null;

  return (
    <div className="flex flex-col w-full h-full pb-32 px-16 gap-16">
      <MonthDaySelector onChange={setSelectedTab} unit={selectedTab} />

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
