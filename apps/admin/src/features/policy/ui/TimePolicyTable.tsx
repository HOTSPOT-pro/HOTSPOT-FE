'use client';

import { Button, useModal } from '@hotspot/ui';
import DeleteIcon from '@hotspot/ui/assets/icons/delete.svg';
import PlusIcon from '@hotspot/ui/assets/icons/plus.svg';
import TimeIcon from '@hotspot/ui/assets/icons/time.svg';
import { useCallback, useState } from 'react';
import { usePolicy } from '@/domains/policy';
import { CategorySelect, type Column, Pagination, Table } from '@/shared';
import { dateFormatter } from '../util/dateFormatter';

const PAGE_SIZE_OPTIONS = [
  { label: '10개', value: '10' },
  { label: '20개', value: '20' },
  { label: '50개', value: '50' },
  { label: '100개', value: '100' },
] as const; //TODO: page 설정 관련 중복, 나중에 따로 빼기

export const TimePolicyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]['value']>('10');

  const { policyList, loading } = usePolicy({
    page: currentPage - 1,
    size: Number(pageSize),
  });

  const { open } = useModal();
  const handleOpenModal = useCallback(() => {
    open('addTimePolicyModal');
  }, [open]);
  const handleDeleteModal = useCallback(
    ({ id, name }: { id: number; name: string }) => {
      open('deletePolicyModal', {
        props: {
          policyId: id,
          policyName: name,
          policyType: 'TIME',
        },
      });
    },
    [open],
  );
  const handleActivateModal = useCallback(
    ({ id, name, isActive }: { id: number; name: string; isActive: boolean }) => {
      open('activatePolicyModal', {
        props: {
          isActive: isActive,
          policyId: id,
          policyName: name,
          policyType: 'TIME',
        },
      });
    },
    [open],
  );

  const handlePageSizeChange = (nextPageSize: (typeof PAGE_SIZE_OPTIONS)[number]['value']) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const tableData =
    policyList?.items.map((item) => ({
      ...item,
      id: `정책 리스트 ${item.policyId}`,
    })) ?? [];

  const totalCount = policyList?.totalElements ?? 0;
  const totalPages = Math.max(policyList?.totalPages ?? 0, 1);

  const columns: Column<(typeof tableData)[0]>[] = [
    { accessor: 'displayId', header: 'ID' },
    { accessor: 'policyName', header: '정책명' },
    { accessor: 'policyScheduleLabel', header: '정책 시간' },
    {
      accessor: 'policyDescription',
      header: '설명',
      render: (value) => (
        <div className="max-w-200 whitespace-normal break-all line-clamp-3" title={value}>
          {value}
        </div>
      ),
    },
    {
      accessor: 'active_actions',
      header: '활성',
      render: (_val, row) => (
        <Button
          className={`h-8 w-auto rounded-md px-3 text-xs ${row.is_active ? 'bg-lime-500 hover:bg-lime-600' : 'bg-gray-400 hover:bg-gray-500'}`}
          onClick={() =>
            handleActivateModal({ id: row.policyId, isActive: row.is_active, name: row.policyName })
          }
          title={row.is_active ? '눌러서 비활성화합니다.' : '눌러서 활성화합니다.'}
          variant="solid"
        >
          {row.is_active ? '활성' : '비활성'}
        </Button>
      ),
    },
    { accessor: 'createdTime', header: '생성일', render: (val) => dateFormatter(val) },
    {
      accessor: 'delete_actions',
      header: '삭제',
      render: (_val, row) => (
        <button
          aria-label={`정책 ${row.policyName} 삭제`}
          className="flex items-center p-2 gap-2 rounded-xl hover:bg-red-100"
          onClick={() => handleDeleteModal({ id: row.policyId, name: row.policyName })}
          type="button"
        >
          <DeleteIcon className="w-4 h-4 text-red-700" />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="flex justify-between p-6 pb-4 border-b border-gray-100">
        <p className="flex flex-row text-[16px] text-black font-semibold gap-2">
          <TimeIcon className="w-6 h-6 text-purple-600" />
          시간대별 정책
        </p>
        <div className="flex flex-row gap-2">
          <CategorySelect
            onChange={handlePageSizeChange}
            options={[...PAGE_SIZE_OPTIONS]}
            value={pageSize}
          />
          <Button
            className="w-fit pl-3.5 pr-5 py-2 h-fit flex flex-row gap-1"
            onClick={handleOpenModal}
          >
            <PlusIcon className="w-4.5 h-4.5" />
            추가
          </Button>
        </div>
      </div>

      <Table columns={columns} data={tableData} isLoading={loading} />

      <div className="flex justify-end px-5">
        {totalCount > 0 && (
          <Pagination current={currentPage} onMove={(p) => setCurrentPage(p)} total={totalPages} />
        )}
      </div>
    </div>
  );
};
