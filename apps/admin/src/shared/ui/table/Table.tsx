import type { ReactNode } from 'react';

export interface Column<T> {
  header: string; // 칼럼 이름
  accessor: keyof T | (string & {}); // 데이터의 키 값 또는 버튼 등 커스텀 액션용
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
            <td className="p-16" key={`skeleton-col-${colIndex}`}>
              <div className="h-28 bg-gray-100 rounded-md animate-pulse w-full" />
            </td>
          ))}
        </tr>
      ));
    }

    // 데이터가 없을 때
    if (data.length === 0) {
      return (
        <tr>
          <td
            className="px-24 py-50 text-center text-gray-400 font-medium"
            colSpan={columns.length}
          >
            데이터가 존재하지 않습니다.
          </td>
        </tr>
      );
    }

    // 정상 데이터가 있을 때
    return data.map((row) => (
      <tr className="hover:bg-gray-50/50 transition-colors group" key={row.id}>
        {columns.map((col, index) => {
          const value = (row as any)[col.accessor];

          const content = col.render // render 함수가 있으면 최우선
            ? col.render(value, row)
            : (value as React.ReactNode);

          return (
            <td
              className="p-16 whitespace-nowrap text-black font-body-body2"
              key={`${String(row.id)}-${String(col.accessor)}-${index}`}
            >
              {content}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        {/* Header */}
        <thead className=" text-gray-700 uppercase border-b border-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th
                className={`p-16 tracking-wider font-title-title4-medium whitespace-nowrap`}
                key={`head-${index}`}
                scope="col"
              >
                <div className="flex items-center">{col.header}</div>
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
