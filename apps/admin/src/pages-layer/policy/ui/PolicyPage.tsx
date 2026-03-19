import { BlockPolicyTable, TimePolicyTable } from '@/features/policy';

export const PolicyPage = () => {
  return (
    <div className="p-16 w-full flex flex-col gap-16">
      <TimePolicyTable />
      <BlockPolicyTable />
    </div>
  );
};
