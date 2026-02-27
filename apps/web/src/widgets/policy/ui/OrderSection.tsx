import { useState } from 'react';
import { PolicyOrderSelector, PolicyPriorityList } from '@/features/policy-order';

export const OrderSection = () => {
  const [policy, setPolicy] = useState<'FIFO' | 'PRIORITY'>('FIFO');

  return (
    <div className="p-5 flex flex-col gap-1">
      <p className="text-base font-bold">데이터 우선순위</p>
      <p className="text-sm font-normal text-gray-600">데이터 할당 방식을 선택하세요</p>

      <PolicyOrderSelector policy={policy} setPolicy={setPolicy} />

      <div className="flex flex-col justify-center">
        {policy === 'FIFO' ? (
          <div className="bg-gray-100 p-4 rounded-2xl">
            <p className="text-sm text-gray-500 leading-relaxed">
              선착순 모드에서는 데이터를 먼저 사용하는 구성원 순서대로 할당됩니다.
            </p>
          </div>
        ) : (
          <PolicyPriorityList />
        )}
      </div>
    </div>
  );
};
