'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFamilies } from '@/features/family/families';
import { Pagination, SearchBar, Table } from '@/shared';
import { familyColumns } from '../constants/FamilyListColumns';

export const FamiliesPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, totalCount, isLoading, isSearching, fetchByPhone } = useFamilies(
    currentPage - 1,
    10,
  );

  const totalPages = Math.ceil(totalCount / 10);

  const columns = familyColumns((id) => router.push(`families/${id}`));

  return (
    <div className="p-16 w-full">
      <div className="p-16 bg-white rounded-xl shadow-xs mb-24">
        <SearchBar
          onClear={() => fetchByPhone('')}
          onSubmit={(value) => {
            setCurrentPage(1);
            fetchByPhone(value);
          }}
        />
      </div>

      <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] overflow-hidden px-20 min-w-full">
        <div className="flex justify-between items-center border-b border-gray-100">
          <p className="py-20 font-title-title3-semibold text-gray-500 font-medium">
            {isSearching ? `검색 결과: ${totalCount}건` : `총 ${totalCount}건`}
          </p>
        </div>

        <Table columns={columns} data={data} isLoading={isLoading} />

        <div className="flex justify-end px-20 py-16">
          {!isSearching && totalCount > 0 && (
            <Pagination current={currentPage} onMove={setCurrentPage} total={totalPages} />
          )}
        </div>
      </div>
    </div>
  );
};
