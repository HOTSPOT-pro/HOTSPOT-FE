'use client';

import { Card, CardContent, Tab } from '@hotspot/ui';
import { useEffect, useMemo, useState } from 'react';
import { useApplicationsQuery } from '@/features/apply';
import type { ApplicationStatus } from '@/features/apply/api/types';
import { type Column, Pagination, Table } from '@/shared';
import { getApiErrorMessage } from '@/shared/api/types';

interface MemberAddRequestRow {
  id: string;
  familyName: string;
  requesterName: string;
  requesterPhoneNumber: string;
  requestDisplayId: string;
  requestedAt: string;
  status: ApplicationStatus;
  targetText: string;
  targets: { id: string; name: string; phone: string }[];
}

const STATUS_ITEMS: ReadonlyArray<{ label: string; value: ApplicationStatus }> = [
  { label: '대기 중', value: 'PENDING' },
  { label: '승인 완료', value: 'APPROVED' },
  { label: '승인 거절', value: 'REJECTED' },
  { label: '취소', value: 'CANCELED' },
];

const PAGE_SIZE = 20;

const statusLabelMap: Record<ApplicationStatus, string> = {
  APPROVED: '승인 완료',
  CANCELED: '취소',
  PENDING: '대기 중',
  REJECTED: '승인 거절',
};

const statusBadgeMap: Record<ApplicationStatus, string> = {
  APPROVED: 'bg-emerald-100 text-emerald-700',
  CANCELED: 'bg-gray-100 text-gray-700',
  PENDING: 'bg-amber-100 text-amber-700',
  REJECTED: 'bg-rose-100 text-rose-700',
};

const formatRequestedAt = (requestedAt: string): string => {
  const date = new Date(requestedAt);
  if (Number.isNaN(date.getTime())) {
    return requestedAt;
  }

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formatter.format(date).replaceAll('. ', '-').replace('.', '');
};

const tableColumns: Column<MemberAddRequestRow>[] = [
  {
    accessor: 'requestDisplayId',
    header: '요청번호',
  },
  {
    accessor: 'requesterName',
    header: '신청자',
  },
  {
    accessor: 'requesterPhoneNumber',
    header: '신청자 연락처',
  },
  {
    accessor: 'targets',
    header: '대상자',
    render: (_, row) => {
      return (
        <ul className="space-y-1">
          {row.targets.map((target) => (
            <li key={target.id}>
              <p className="text-sm font-medium text-gray-900">{target.name}</p>
              <p className="text-xs text-gray-500">{target.phone}</p>
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessor: 'familyName',
    header: '가족명',
  },
  {
    accessor: 'requestedAt',
    header: '요청 시각',
  },
  {
    accessor: 'status',
    header: '상태',
    render: (value) => {
      const status = value as ApplicationStatus;

      return (
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeMap[status]}`}>
          {statusLabelMap[status]}
        </span>
      );
    },
  },
];

export const MemberAddPage = () => {
  const [activeStatus, setActiveStatus] = useState<ApplicationStatus>('PENDING');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isFetching } = useApplicationsQuery({
    applyType: 'ADD',
    page: currentPage - 1,
    size: PAGE_SIZE,
    status: activeStatus,
  });

  const totalPages = Math.max(data?.totalPages ?? 0, 1);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handleStatusChange = (nextStatus: ApplicationStatus) => {
    setActiveStatus(nextStatus);
    setCurrentPage(1);
  };

  const rows = useMemo<MemberAddRequestRow[]>(() => {
    return (data?.requests ?? []).map((request) => {
      const targets = request.targets.map((target) => ({
        id: `${request.requestId}-${target.targetSubId}`,
        name: target.targetName,
        phone: target.targetPhoneNumber,
      }));

      return {
        familyName: request.familyName,
        id: request.requestDisplayId,
        requestDisplayId: request.requestDisplayId,
        requestedAt: formatRequestedAt(request.requestedAt),
        requesterName: request.requesterName,
        requesterPhoneNumber: request.requesterPhoneNumber,
        status: activeStatus,
        targets,
        targetText: targets.map((target) => `${target.name} ${target.phone}`).join(' '),
      };
    });
  }, [activeStatus, data?.requests]);

  const filteredRows = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return rows.filter((request) => {
      if (!normalizedKeyword) {
        return true;
      }

      return [
        request.requesterName,
        request.requesterPhoneNumber,
        request.familyName,
        request.targetText,
      ].some((value) => value.toLowerCase().includes(normalizedKeyword));
    });
  }, [keyword, rows]);

  const errorMessage = useMemo(() => {
    if (!error) {
      return null;
    }

    return getApiErrorMessage(
      error.response?.data ?? error,
      '요청 목록 조회 중 오류가 발생했습니다.',
    );
  }, [error]);

  return (
    <section className="flex flex-col h-full pb-8">
      <Tab
        activeValue={activeStatus}
        items={[...STATUS_ITEMS]}
        onTabChange={handleStatusChange}
        variant="segment"
      />
      <div className="flex flex-col px-4 h-full">
        <Card className="h-full flex flex-col">
          <CardContent className="h-full flex flex-col">
            {errorMessage && (
              <p className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {errorMessage}
              </p>
            )}
            <div className="h-full flex flex-col justify-between">
              <Table
                columns={tableColumns}
                data={filteredRows}
                isLoading={isLoading || isFetching}
              />
              <Pagination current={currentPage} onMove={setCurrentPage} total={totalPages} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
