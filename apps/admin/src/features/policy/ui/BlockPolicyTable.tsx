'use client';

import { Button, Toggle, useModal } from '@hotspot/ui';
import ArrowIcon from '@hotspot/ui/assets/icons/arrow-bar.svg';
import TimeIcon from '@hotspot/ui/assets/icons/time.svg';
import { useCallback, useState } from 'react';
import { useBlocked } from '@/entities/policy/model/usePolicy';
import { type Column, Pagination, Table } from '@/shared';
import { useUpdatePolicyActive } from '../model/useActivePolicy';

export const BlockPolicyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { blockedList, loading } = useBlocked({
    page: currentPage - 1,
    size: itemsPerPage,
  });

  const { open } = useModal();
  const handleOpenModal = useCallback(() => {
    open('addBlockPolicyModal');
  }, [open]);

  const { updatePolicyActive } = useUpdatePolicyActive();

  const tableData =
    blockedList?.items.map((item) => ({
      ...item,
      id: `차단 리스트 ${item.policyId}`,
    })) ?? [];

  const totalCount = blockedList?.totalElements ?? 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const columns: Column<(typeof tableData)[0]>[] = [
    { accessor: 'displayId', header: 'ID' },
    { accessor: 'policyName', header: '정책명' },
    { accessor: 'policyCode', header: '정책 코드' },
    {
      accessor: 'actions',
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
    { accessor: 'createdTime', header: '생성일' },
    {
      accessor: 'actions',
      header: '삭제',
      render: (_val, row) => (
        <button
          className="flex items-center px-3 py-2 gap-2 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200"
          onClick={() => console.log(`${row.policyId} 정책 삭제`)}
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
        <p className="flex flex-row text-[16px] text-gray-500 font-medium">
          <TimeIcon className="w-6 h-6 text-purple-600" />
          차단 서비스 정책
        </p>
        <Button className="w-30 h-10" onClick={handleOpenModal}>
          추가
        </Button>
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
