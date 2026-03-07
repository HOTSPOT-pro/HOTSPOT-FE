'use client';

import { Button, Toggle, useModal } from '@hotspot/ui';
import ArrowIcon from '@hotspot/ui/assets/icons/arrow-bar.svg';
import BlockIcon from '@hotspot/ui/assets/icons/close-circle.svg';
import PlusIcon from '@hotspot/ui/assets/icons/plus.svg';
import { useCallback, useState } from 'react';
import { useBlocked } from '@/domains/policy';
import { CategorySelect, type Column, Pagination, Table } from '@/shared';
import { useUpdatePolicyActive } from '../model/useActivePolicy';
import { useDeletePolicy } from '../model/useDeletePolicy';
import { dateFormatter } from '../util/dateFormatter';

const PAGE_SIZE_OPTIONS = [
  { label: '10개', value: '10' },
  { label: '20개', value: '20' },
  { label: '50개', value: '50' },
  { label: '100개', value: '100' },
] as const; //TODO: page 설정 관련 중복, 나중에 따로 빼기

export const BlockPolicyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]['value']>('10');

  const { blockedList, loading } = useBlocked({
    page: currentPage - 1,
    size: Number(pageSize),
  });

  const { open } = useModal();
  const handleOpenModal = useCallback(() => {
    open('addBlockPolicyModal');
  }, [open]);

  const { updatePolicyActive } = useUpdatePolicyActive();
  const { deletePolicy } = useDeletePolicy();

  const handlePageSizeChange = (nextPageSize: (typeof PAGE_SIZE_OPTIONS)[number]['value']) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const tableData =
    blockedList?.items.map((item) => ({
      ...item,
      id: `차단 리스트 ${item.policyId}`,
    })) ?? [];

  const totalCount = blockedList?.totalElements ?? 0;
  const totalPages = Math.max(blockedList?.totalPages ?? 0, 1);

  const columns: Column<(typeof tableData)[0]>[] = [
    { accessor: 'displayId', header: 'ID' },
    { accessor: 'policyName', header: '정책명' },
    { accessor: 'policyCode', header: '정책 코드' },
    {
      accessor: 'active_actions',
      header: '활성',
      render: (_val, row) => (
        <Toggle
          checked={row.is_active}
          id={`차단 활성 ${row.policyId}`}
          onChange={() => {
            updatePolicyActive.mutate({
              isActive: !row.is_active,
              policyId: row.policyId,
              policyType: 'APP',
            });
          }}
        />
      ),
    },
    { accessor: 'createdTime', header: '생성일', render: (val) => dateFormatter(val) },
    {
      accessor: 'delete_actions',
      header: '삭제',
      render: (_val, row) => (
        <button
          className="flex items-center px-3 py-2 gap-2 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200"
          onClick={() => deletePolicy({ policyId: row.policyId, policyType: 'APP' })}
          type="button"
        >
          <ArrowIcon className="rotate-90 w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="flex justify-between p-6 pb-4 border-b border-gray-100">
        <p className="flex flex-row text-[16px] text-black font-semibold gap-2">
          <BlockIcon className="w-6 h-6 text-purple-600" />
          차단 서비스 정책
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
