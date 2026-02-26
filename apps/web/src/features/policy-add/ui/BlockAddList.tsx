import { type BlockPolicy, useBlock } from '@entities/policy';
import { BlockAddItem } from '@entities/policy-add';
import { useEffect, useState } from 'react';

interface PolicyAddListProps {
  data: BlockPolicy[];
}

export const BlockAddList = ({ data }: PolicyAddListProps) => {
  const [selectedPolicies, setSelectedPolicies] = useState(data);
  const { blockList } = useBlock();

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
      {blockList?.map((b) => {
        const isApply = selectedPolicies.some((p) => p.id === b.id);
        return (
          <BlockAddItem
            isApply={isApply}
            key={b.id}
            name={b.name}
            onToggle={(checked) => handleToggle(b.id, checked)}
          />
        );
      })}
    </div>
  );
};
