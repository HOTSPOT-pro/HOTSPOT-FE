export default function FamilyUsageLayout({
  children,
  giftedDataStatus,
  myDataStatus,
}: {
  children: React.ReactNode;
  giftedDataStatus: React.ReactNode;
  myDataStatus: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full px-4 pt-4 pb-8 gap-4">
      {myDataStatus}
      {giftedDataStatus}
      {children}
    </div>
  );
}
