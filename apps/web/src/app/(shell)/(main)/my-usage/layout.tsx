import { BlockedPolicyBanner } from '@/widgets/blocked-policy-banner';

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
    <div className="flex flex-col w-full h-full px-16 pt-16 pb-32 gap-16">
      <BlockedPolicyBanner />
      {myTotalData}
      {myDataStatus}
      {giftedDataStatus}
      {children}
    </div>
  );
}
