import { BlockPolicyTable, TimePolicyTable } from '@/features/policy';

export const PolicyPage = () => {
  return (
    <div className="p-4 w-full">
      <TimePolicyTable />
      <BlockPolicyTable />
    </div>
  );
};
