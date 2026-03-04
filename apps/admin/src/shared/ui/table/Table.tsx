import type { ReactNode } from 'react';

export interface Column<T> {
  header: string; // 칼럼 이름
  accessor: keyof T | 'actions'; // 데이터의 키 값 또는 버튼 등 커스텀 액션용
  render?: (value: any, row: T) => ReactNode; // 커스텀 렌더링 함수
}

export interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
}

export const Table = <T extends { id: string | number }>({
  columns,
  data,
  isLoading,
}: DynamicTableProps<T>) => {
  if (isLoading) return <div className="p-4 text-center">로딩 중...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        {/* Header */}
        <thead className="text-xs text-gray-700 uppercase border-b border-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th
                className={`p-5 tracking-wider font-medium text-[15px] whitespace-nowrap`}
                key={`head-${index}`}
                scope="col"
              >
                <div className="flex items-center gap-2">{col.header}</div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((row) => (
              <tr className="hover:bg-blue-50/30 transition-colors group" key={row.id}>
                {columns.map((col, index) => {
                  const cellValue =
                    col.accessor !== 'actions'
                      ? (row[col.accessor as keyof T] as React.ReactNode)
                      : null;

                  return (
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-black text-[14px] font-normal`}
                      key={`cell-${row.id}-${index}`}
                    >
                      {col.render ? col.render(cellValue, row) : cellValue}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            /* 데이터 없을 때 */
            <tr>
              <td
                className="px-6 py-20 text-center text-gray-400 font-medium"
                colSpan={Math.max(1, columns.length)}
              >
                데이터가 존재하지 않습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
