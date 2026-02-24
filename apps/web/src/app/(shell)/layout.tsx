import { BottomNavController } from '@/widgets/app-bottom-nav';

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col h-full overflow-auto pb-14.5">{children}</div>
      <BottomNavController />
    </>
  );
}
