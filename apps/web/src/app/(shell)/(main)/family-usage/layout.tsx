export default function FamilyUsageLayout({
  children,
  appliedRestrictions,
  familyDataStatus,
}: {
  children: React.ReactNode;
  appliedRestrictions: React.ReactNode;
  familyDataStatus: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full px-4 pt-4 pb-8 gap-4">
      {familyDataStatus}
      {appliedRestrictions}
      {children}
    </div>
  );
}
