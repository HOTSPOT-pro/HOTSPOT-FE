export default function MyUsageLayout({
  children,
  giftedDataStatus,
  myDataStatus,
  myTotalData,
}: {
  children: React.ReactNode;
  giftedDataStatus: React.ReactNode;
  myDataStatus: React.ReactNode;
  myTotalData: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full px-4 pt-4 pb-8 gap-4">
      {myTotalData}
      {myDataStatus}
      {giftedDataStatus}
      {children}
    </div>
  );
}
