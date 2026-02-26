import { type Block, usePolicy } from '@entities/policy';
import { BlockAddItem } from '@entities/policy-add';
import { useEffect, useState } from 'react';

interface PolicyAddListProps {
  data: Block[];
}

export const BlockAddList = ({ data }: PolicyAddListProps) => {
  const [selectedPolicies, setSelectedPolicies] = useState(data);
  const { blockList } = usePolicy();

  //TODO: useQuery로 바꾸어 캐싱 고려
  useEffect(() => {
    setSelectedPolicies(data);
  }, [data]);

  const handleToggle = (policyId: number, checked: boolean) => {
    setSelectedPolicies((prev) => {
      if (checked) {
        const policyToAdd = data.find((p) => p.id === policyId);
        if (policyToAdd && !prev.some((p) => p.id === policyId)) {
          return [...prev, policyToAdd];
        }
        return prev;
      } else {
        return prev.filter((p) => p.id !== policyId);
      }
    });
  };

  return (
    <div className="max-h-100 overflow-y-auto py-4 flex flex-col gap-2">
      {blockList.map((policy) => {
        const isApply = selectedPolicies.some((p) => p.id === policy.id);
        return (
          <BlockAddItem
            isApply={isApply}
            key={policy.id}
            name={policy.name}
            onToggle={(checked) => handleToggle(policy.id, checked)}
          />
        );
      })}
    </div>
  );
};
