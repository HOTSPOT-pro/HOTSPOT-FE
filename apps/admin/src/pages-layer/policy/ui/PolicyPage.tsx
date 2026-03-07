import { BlockPolicyTable, TimePolicyTable } from '@/features/policy';

export const PolicyPage = () => {
  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <TimePolicyTable />
      <BlockPolicyTable />
    </div>
  );
};
