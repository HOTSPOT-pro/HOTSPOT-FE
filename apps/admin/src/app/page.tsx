'use client';
import ClockIcon from '@hotspot/ui/assets/icons/time.svg';
import { Button } from '@hotspot/ui/components';
import { useState } from 'react';
import { Table } from '@/shared/ui';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import type { Column } from '@/shared/ui/table/Table';

interface User {
  email: string;
  id: number;
  name: string;
  role: string;
}

const page = () => {
  // 임시 데이터
  const allData = Array.from({ length: 12 }, (_, i) => ({
    email: `user${i + 1}@example.com`,
    id: i + 1,
    name: `사용자 ${i + 1}`,
    role: i % 3 === 0 ? 'Admin' : 'User',
  }));

  // 페이지네이션 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 5개씩
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const currentData = allData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 테이블 칼럼 설정
  const columns: Column<User>[] = [
    { accessor: 'id', header: '번호' },
    { accessor: 'name', header: '이름' },
    { accessor: 'email', header: '이메일' },
    {
      accessor: 'role',
      header: '권한',
      render: (val: string) => (
        <span className={val === 'Admin' ? 'text-purple-600 font-bold' : ''}>{val}</span>
      ),
    },
    {
      accessor: 'actions',
      header: '액션',
      render: (_, row) => (
        <button
          className="text-sm underline"
          onClick={() => console.log(`${row} 액션`)}
          type="button"
        >
          수정
        </button>
      ),
    },
  ];

  return (
    <div className="p-5 h-screen">
      <Button>test</Button>
      <span className="text-blue-500">하이</span>
      <div className="p-10 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* 상단 영역 */}
          <div className="p-6 pb-1 border-b border-gray-50">
            <div className="flex items-center gap-2 mb-1">
              <ClockIcon className="w-5 h-5 text-blue-500" />
              <h2 className="text-[18px] font-bold text-gray-800">테이블 제목</h2>
            </div>
            <p className="text-[14px] text-gray-500 font-medium">
              총 <span className="text-blue-600 font-semibold">{allData.length}</span>건
            </p>
          </div>
          <Table columns={columns} data={currentData} />
          <Pagination current={currentPage} onMove={(p) => setCurrentPage(p)} total={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default page;
