import type { Policy } from '@entities/policy';
import { policyDescriptionFormatter, usePolicy } from '@entities/policy';
import { PolicyAddItem } from '@entities/policy-add';
import type { PolicyApply } from '../model/types';

interface PolicyAddListProps {
  data: Policy[];
  draft: Partial<PolicyApply>;
  onUpdate: (policyIds: number[]) => void;
}

export const PolicyAddList = ({ data, draft, onUpdate }: PolicyAddListProps) => {
  const { policyList } = usePolicy();

  const currentSelectedIds = draft.blockPolicyIdList ?? data.map((p) => p.id);

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
        const isApply = currentSelectedIds.includes(policy.id);
        return (
          <PolicyAddItem
            description={policyDescriptionFormatter(policy)}
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
