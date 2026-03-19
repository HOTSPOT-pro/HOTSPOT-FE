import { useFamilyAppliedPolicy } from '@/domains/policy';
import { useUserStore } from '@/domains/user';
import { FamilyPolicyList } from '@/features/policy/policy-list/ui/FamilyPolicyList';
import { OrderSection } from '@/features/policy/policy-order';

export const PolicyManageSection = () => {
  const { priorityPerFamily } = useFamilyAppliedPolicy();
  const user = useUserStore();

  if (!priorityPerFamily || user.familyRole === 'CHILD') {
    return null;
  }

  return (
    <div className="flex flex-col gap-16">
      <FamilyPolicyList />
      <OrderSection data={priorityPerFamily} />
    </div>
  );
};
