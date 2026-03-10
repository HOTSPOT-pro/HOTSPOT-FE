import { useFamilyAppliedPolicy } from '@/entities/policy';
import { useUserStore } from '@/entities/user';
import { FamilyPolicyList } from '@/features/policy/policy-list/ui/FamilyPolicyList';
import { OrderSection } from '@/features/policy/policy-order';

export const PolicyManageSection = () => {
  const { priorityPerFamily } = useFamilyAppliedPolicy();
  const user = useUserStore();

  if (!priorityPerFamily || user.familyRole === 'CHILD') {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <FamilyPolicyList />
      <OrderSection data={priorityPerFamily} />
    </div>
  );
};
