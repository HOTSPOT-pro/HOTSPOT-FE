import { BottomNavController } from '@/widgets/bottom-navigation/ui/BottomNavController';

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col overflow-auto">
      {children} <BottomNavController />
    </div>
  );
}
