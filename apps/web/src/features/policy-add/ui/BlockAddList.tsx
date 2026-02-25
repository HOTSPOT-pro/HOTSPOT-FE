import type { Policy } from '@entities/policy';
import { BlockAddItem } from '@entities/policy-add';
import { useState } from 'react';

interface PolicyAddListProps {
  data: Policy[];
}

export const BlockAddList = ({ data }: PolicyAddListProps) => {
  const [selectedPolicies, setSelectedPolicies] = useState(data);

  const handleToggle = (policyId: number, checked: boolean) => {
    setSelectedPolicies((prev) => {
      if (checked) {
        [];
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
      {data.map((policy) => {
        const isApply = selectedPolicies.some((p) => p.id === policy.id);
        return (
          <BlockAddItem
            description={policy.description}
            isApply={isApply}
            key={policy.id}
            onToggle={(checked) => handleToggle(policy.id, checked)}
            title={policy.name}
          />
        );
      })}
    </div>
  );
};
