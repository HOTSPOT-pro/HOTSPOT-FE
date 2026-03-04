import { usePolicy } from '@/entities/policy/model/usePolicy';
import type { PolicyItem } from '../../member-info/model/types';
import type { PolicyApply } from '../model/types';
import { PolicyAddItem } from './PolicyAddItem';

interface PolicyAddListProps {
  data: PolicyItem[];
  draft: Partial<PolicyApply>;
  onUpdate: (policyIds: number[]) => void;
}

export const PolicyAddList = ({ data, draft, onUpdate }: PolicyAddListProps) => {
  const { policyList } = usePolicy({});

  const currentSelectedIds = draft.blockPolicyIdList ?? data.map((p) => p.policyId);

  const handleToggle = (policyId: number, checked: boolean) => {
    let nextIds: number[];
    if (checked) {
      nextIds = [...currentSelectedIds, policyId];
    } else {
      nextIds = currentSelectedIds.filter((id) => id !== policyId);
    }
    onUpdate(nextIds);
  };

  return (
    <div className="max-h-100 overflow-y-auto py-4 flex flex-col gap-2">
      {policyList.map((policy) => {
        const isApply = currentSelectedIds.includes(policy.policyId);
        return (
          <PolicyAddItem
            description={policy.policyCode}
            id={policy.policyId}
            isApply={isApply}
            key={policy.policyId}
            name={policy.policyName}
            onToggle={(checked) => handleToggle(policy.policyId, checked)}
          />
        );
      })}
    </div>
  );
};
