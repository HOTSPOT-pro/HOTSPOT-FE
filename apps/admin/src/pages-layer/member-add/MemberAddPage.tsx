'use client';

import { Tab } from '@hotspot/ui';
import { useMemo, useState } from 'react';
import { type Column, Pagination, SearchBar, Table } from '@/shared';

type MemberAddStatus = 'WAITING' | 'APPROVED' | 'REJECTED';

interface MemberAddRequest {
  id: string;
  name: string;
  phone: string;
  familyName: string;
  requestedAt: string;
  status: MemberAddStatus;
  reviewedAt?: string;
}

const STATUS_ITEMS: ReadonlyArray<{ label: string; value: MemberAddStatus }> = [
  { label: '대기 중', value: 'WAITING' },
  { label: '승인 완료', value: 'APPROVED' },
  { label: '승인 거절', value: 'REJECTED' },
];

const PAGE_SIZE = 5;

const MEMBER_ADD_REQUESTS: MemberAddRequest[] = [
  {
    familyName: '김지훈 가족',
    id: 'req-001',
    name: '김민수',
    phone: '010-1234-5678',
    requestedAt: '2026-03-05 09:22',
    status: 'WAITING',
  },
  {
    familyName: '김지훈 가족',
    id: 'req-002',
    name: '김서연',
    phone: '010-3344-2211',
    requestedAt: '2026-03-05 08:41',
    status: 'WAITING',
  },
  {
    familyName: '이수진 가족',
    id: 'req-003',
    name: '이도현',
    phone: '010-7171-8282',
    requestedAt: '2026-03-04 19:15',
    status: 'WAITING',
  },
  {
    familyName: '박성호 가족',
    id: 'req-004',
    name: '박지은',
    phone: '010-2391-9977',
    requestedAt: '2026-03-04 16:30',
    status: 'WAITING',
  },
  {
    familyName: '정하늘 가족',
    id: 'req-005',
    name: '정윤아',
    phone: '010-3001-7777',
    requestedAt: '2026-03-04 14:07',
    status: 'WAITING',
  },
  {
    familyName: '한소영 가족',
    id: 'req-006',
    name: '한지훈',
    phone: '010-9090-2020',
    requestedAt: '2026-03-03 12:05',
    reviewedAt: '2026-03-03 12:16',
    status: 'APPROVED',
  },
  {
    familyName: '오지혜 가족',
    id: 'req-007',
    name: '오수민',
    phone: '010-8734-0033',
    requestedAt: '2026-03-03 09:11',
    reviewedAt: '2026-03-03 09:28',
    status: 'APPROVED',
  },
  {
    familyName: '장민호 가족',
    id: 'req-008',
    name: '장다은',
    phone: '010-5345-1212',
    requestedAt: '2026-03-02 18:10',
    reviewedAt: '2026-03-02 18:27',
    status: 'APPROVED',
  },
  {
    familyName: '유다인 가족',
    id: 'req-009',
    name: '유재호',
    phone: '010-2000-1122',
    requestedAt: '2026-03-02 11:45',
    reviewedAt: '2026-03-02 12:03',
    status: 'REJECTED',
  },
  {
    familyName: '최한결 가족',
    id: 'req-010',
    name: '최서진',
    phone: '010-6677-1122',
    requestedAt: '2026-03-01 17:32',
    reviewedAt: '2026-03-01 17:50',
    status: 'REJECTED',
  },
  {
    familyName: '송민재 가족',
    id: 'req-011',
    name: '송지우',
    phone: '010-7171-1111',
    requestedAt: '2026-03-01 11:09',
    reviewedAt: '2026-03-01 11:41',
    status: 'REJECTED',
  },
];

const statusLabelMap: Record<MemberAddStatus, string> = {
  APPROVED: '승인 완료',
  REJECTED: '승인 거절',
  WAITING: '대기 중',
};

const statusBadgeMap: Record<MemberAddStatus, string> = {
  APPROVED: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-rose-100 text-rose-700',
  WAITING: 'bg-amber-100 text-amber-700',
};

const tableColumns: Column<MemberAddRequest>[] = [
  {
    accessor: 'name',
    header: '구성원 이름',
  },
  {
    accessor: 'phone',
    header: '연락처',
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
    accessor: 'reviewedAt',
    header: '처리 시각',
    render: (value) => value ?? '-',
  },
  {
    accessor: 'status',
    header: '상태',
    render: (value) => {
      const status = value as MemberAddStatus;

      return (
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeMap[status]}`}>
          {statusLabelMap[status]}
        </span>
      );
    },
  },
];

export const MemberAddPage = () => {
  const [activeStatus, setActiveStatus] = useState<MemberAddStatus>('WAITING');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatusChange = (nextStatus: MemberAddStatus) => {
    setActiveStatus(nextStatus);
    setCurrentPage(1);
  };

  const handleKeywordChange = (nextKeyword: string) => {
    setKeyword(nextKeyword);
    setCurrentPage(1);
  };

  const handleKeywordClear = () => {
    setKeyword('');
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return MEMBER_ADD_REQUESTS.filter((request) => {
      if (request.status !== activeStatus) {
        return false;
      }

      if (!normalizedKeyword) {
        return true;
      }

      return [request.name, request.phone, request.familyName].some((value) =>
        value.toLowerCase().includes(normalizedKeyword),
      );
    });
  }, [activeStatus, keyword]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const pagedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredData]);

  return (
    <section className="m-4 flex min-w-0 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">구성원 추가 요청 관리</h2>
          <p className="mt-2 text-sm text-gray-500">
            요청 상태를 확인하고 승인/거절 내역을 조회할 수 있습니다.
          </p>
        </div>
        <div className="w-full max-w-[360px]">
          <SearchBar
            onChange={handleKeywordChange}
            onClear={handleKeywordClear}
            placeholder="이름, 연락처, 가족명 검색"
            value={keyword}
          />
        </div>
      </div>

      <div className="mb-4">
        <Tab
          activeValue={activeStatus}
          items={[...STATUS_ITEMS]}
          onTabChange={handleStatusChange}
          variant="segment"
        />
      </div>

      <Table columns={tableColumns} data={pagedData} />
      <Pagination current={currentPage} onMove={setCurrentPage} total={totalPages} />
    </section>
  );
};
