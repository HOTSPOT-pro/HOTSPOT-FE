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

export const Table = <T extends { id: string }>({
  columns,
  data,
  isLoading,
}: DynamicTableProps<T>) => {
  const renderBodyContent = () => {
    // 로딩 중일 때
    if (isLoading) {
      return [...Array(5)].map((_, rowIndex) => (
        <tr className="border-b border-gray-50" key={`skeleton-row-${rowIndex}`}>
          {columns.map((_, colIndex) => (
            <td className="p-4" key={`skeleton-col-${colIndex}`}>
              <div className="h-7 bg-gray-100 rounded-md animate-pulse w-full" />
            </td>
          ))}
        </tr>
      ));
    }

    // 데이터가 없을 때
    if (data.length === 0) {
      return (
        <tr>
          <td className="px-6 py-20 text-center text-gray-400 font-medium" colSpan={columns.length}>
            데이터가 존재하지 않습니다.
          </td>
        </tr>
      );
    }

    // 정상 데이터가 있을 때
    return data.map((row) => (
      <tr className="hover:bg-gray-50/50 transition-colors group" key={row.id}>
        {columns.map((col, index) => {
          const cellValue =
            col.accessor !== 'actions' ? (row[col.accessor as keyof T] as React.ReactNode) : null;

          return (
            <td
              className="p-4 whitespace-nowrap text-black text-[14px] font-normal"
              key={`cell-${row.id}-${index}`}
            >
              {col.render ? col.render(cellValue, row) : cellValue}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
      <table className="w-full text-sm text-left border-collapse">
        {/* Header */}
        <thead className="text-xs text-gray-700 uppercase border-b border-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th
                className={`p-4 tracking-wider font-medium text-[15px] whitespace-nowrap`}
                key={`head-${index}`}
                scope="col"
              >
                <div className="flex items-center gap-2">{col.header}</div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100">{renderBodyContent()}</tbody>
      </table>
    </div>
  );
};
