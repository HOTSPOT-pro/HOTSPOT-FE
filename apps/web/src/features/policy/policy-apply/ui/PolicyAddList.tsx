import type { Policy } from '@domains/policy';
import { policyDescriptionFormatter, usePolicy } from '@domains/policy';
import { useFamilyCustomPolicy } from '../../policy-list/model/useFamilyCustomPolicy';
import type { PolicyApply } from '../model/types';
import { PolicyAddItem } from './PolicyAddItem';

interface PolicyAddListProps {
  data: Policy[];
  draft: Partial<PolicyApply>;
  onUpdate: (policyIds: number[]) => void;
}

export const PolicyAddList = ({ data, draft, onUpdate }: PolicyAddListProps) => {
  const { data: policyList } = useFamilyCustomPolicy();

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

  if (!policyList || policyList.length === 0)
    return <div className="p-16 text-center text-gray-400 font-medium">정책이 없습니다.</div>;

  return (
    <div className="max-h-[250px] overflow-y-auto px-8 py-16 flex flex-col gap-8">
      {policyList.map((policy) => {
        const isApply = currentSelectedIds.includes(policy.id);
        return (
          <PolicyAddItem
            description={policyDescriptionFormatter(policy)}
            disable={!policy.isActive}
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
