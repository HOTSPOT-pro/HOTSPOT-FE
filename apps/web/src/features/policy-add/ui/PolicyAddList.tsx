import { useState } from 'react';
import type { Policy } from '@/entities/policy';
import { policyDescriptionFormatter } from '@/entities/policy/lib/policyDescriptionFormatter';
import { usePolicy } from '@/entities/policy/model/usePolicy';
import { PolicyAddItem } from '@/entities/policy-add';

interface PolicyAddListProps {
  data: Policy[];
}

export const PolicyAddList = ({ data }: PolicyAddListProps) => {
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>(data);

  const { policyList } = usePolicy();

  const handleToggle = (policyId: number, checked: boolean) => {
    setSelectedPolicies((prev) => {
      if (checked) {
        const policyToAdd = policyList.find((p) => p.id === policyId);
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
      {policyList.map((policy) => {
        const isApply = selectedPolicies.some((p) => p.id === policy.id);

        return (
          <PolicyAddItem
            description={policyDescriptionFormatter({
              days: policy.policySnapshot.days,
              durationMinutes: policy.policySnapshot.durationMinutes,
              endTime: policy.endTime,
              startTime: policy.startTime,
            })}
            id={policy.id}
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
