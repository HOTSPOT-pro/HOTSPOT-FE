'use client';

import { Button, Toggle, useModal } from '@hotspot/ui';
import BlockIcon from '@hotspot/ui/assets/icons/close-circle.svg';
import DeleteIcon from '@hotspot/ui/assets/icons/delete.svg';
import PlusIcon from '@hotspot/ui/assets/icons/plus.svg';
import { useCallback, useEffect, useState } from 'react';
import { useBlocked } from '@/domains/policy';
import { CategorySelect, type Column, Pagination, Table } from '@/shared';
import { useUpdatePolicyActive } from '../model/useActivePolicy';
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
  const handleDeleteModal = useCallback(
    ({ id, name }: { id: number; name: string }) => {
      open('deletePolicyModal', {
        props: {
          policyId: id,
          policyName: name,
          policyType: 'APP',
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
          policyType: 'APP',
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
    blockedList?.items.map((item) => ({
      ...item,
      id: `차단 리스트 ${item.policyId}`,
    })) ?? [];

  const totalCount = blockedList?.totalElements ?? 0;
  const totalPages = Math.max(blockedList?.totalPages ?? 0, 1);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const columns: Column<(typeof tableData)[0]>[] = [
    { accessor: 'displayId', header: 'ID' },
    { accessor: 'policyName', header: '정책명' },
    { accessor: 'policyCode', header: '정책 코드' },
    {
      accessor: 'active_actions',
      header: '활성',
      render: (_val, row) => (
        <Button
          className={`h-32 w-auto rounded-md px-12 text-xs ${row.is_active ? 'bg-lime-500 hover:bg-lime-600' : 'bg-gray-400 hover:bg-gray-500'}`}
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
          className="flex items-center p-8 gap-8 rounded-xl hover:bg-red-100"
          onClick={() => handleDeleteModal({ id: row.policyId, name: row.policyName })}
          type="button"
        >
          <DeleteIcon className="w-16 h-16 text-red-700" />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="flex justify-between p-24 pb-16 border-b border-gray-100">
        <p className="flex flex-row font-title-title3-semibold text-black gap-8">
          <BlockIcon className="w-24 h-24 text-purple-600" />
          차단 서비스 정책
        </p>
        <div className="flex flex-row gap-8">
          <CategorySelect
            onChange={handlePageSizeChange}
            options={[...PAGE_SIZE_OPTIONS]}
            value={pageSize}
          />
          <Button
            className="w-fit pl-14 pr-20 py-8 h-fit flex flex-row gap-4"
            onClick={handleOpenModal}
          >
            <PlusIcon className="w-18 h-18 font-title-title4-semibold" />
            추가
          </Button>
        </div>
      </div>

      <Table columns={columns} data={tableData} isLoading={loading} />

      {totalCount > 0 && (
        <Pagination current={currentPage} onMove={(p) => setCurrentPage(p)} total={totalPages} />
      )}
    </div>
  );
};
