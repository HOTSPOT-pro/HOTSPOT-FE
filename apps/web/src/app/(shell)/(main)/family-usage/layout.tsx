import { BlockedPolicyBanner } from '@/widgets/blocked-policy-banner';

export default function FamilyUsageLayout({
  children,
  appliedRestrictions,
  familyDataStatus,
  blockedTime,
}: {
  children: React.ReactNode;
  appliedRestrictions: React.ReactNode;
  familyDataStatus: React.ReactNode;
  blockedTime: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full px-16 pt-16 pb-32 gap-16">
      <BlockedPolicyBanner />
      {familyDataStatus}
      {appliedRestrictions}
      {blockedTime}
      {children}
    </div>
  );
}
