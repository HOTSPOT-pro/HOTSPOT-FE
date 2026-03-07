'use client';

import ArrowIcon from '@hotspot/ui/assets/icons/arrow-bar.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFamilyList } from '@/domains/family';
import { FamilySearch } from '@/features/families/ui/FamilySearch';
import { type Column, Pagination, SearchBar, Table } from '@/shared';

export const FamiliesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { familyData, isLoading, isFetching } = useFamilyList({
    page: currentPage - 1,
    size: itemsPerPage,
  });

  const router = useRouter();

  const tableData =
    familyData?.familyList.map((item) => ({
      ...item,
      id: `가족 리스트 ${item.familyId}`,
    })) ?? [];

  const totalCount = familyData?.totalElements ?? 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const columns: Column<(typeof tableData)[0]>[] = [
    { accessor: 'familyId', header: '가족 아이디' },
    { accessor: 'representativeName', header: '대표자' },
    { accessor: 'phoneNumber', header: '전화번호' },
    { accessor: 'memberCount', header: '구성원' },
    {
      accessor: 'actions',
      header: '상세',
      render: (_val, row) => (
        <button
          className="flex items-center px-3 py-2 gap-2 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200"
          onClick={() => router.push(`families/${row.familyId}`)}
          type="button"
        >
          상세
          <ArrowIcon className="rotate-90 w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="p-4 bg-white rounded-xl shadow-xs mb-6">
        <FamilySearch />
      </div>

      <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] overflow-hidden px-5 min-w-full">
        <p className="py-4 border-b border-gray-100 text-[16px] text-gray-500 font-medium">
          총 {totalCount}건
        </p>

        <Table columns={columns} data={tableData} isLoading={isLoading || isFetching} />

        <div className="flex justify-end px-5">
          {totalCount > 0 && (
            <Pagination
              current={currentPage}
              onMove={(p) => setCurrentPage(p)}
              total={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};
