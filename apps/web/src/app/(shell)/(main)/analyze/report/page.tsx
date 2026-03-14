import { DoubleBarChart } from '@hotspot/ui';
import React from 'react';

const page = () => {
  const data = [
    { label: '월', lastWeek: 40, thisWeek: 55 },
    { label: '화', lastWeek: 30, thisWeek: 48 },
    { label: '수', lastWeek: 30, thisWeek: 48 },
    { label: '목', lastWeek: 30, thisWeek: 48 },
    { label: '금', lastWeek: 30, thisWeek: 48 },
    { label: '토', lastWeek: 30, thisWeek: 48 },
    { label: '일', lastWeek: 30, thisWeek: 48 },
  ];

  return (
    <div className="w-full h-100">
      <DoubleBarChart data={data} />
    </div>
  );
};

export default page;
