import { BottomNavController } from '@/widgets/app-bottom-nav';
import { BottomNavLayoutProvider } from '@/widgets/app-bottom-nav/ui/BottomNavLayoutContext';

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BottomNavLayoutProvider>
      <div
        className="flex flex-col h-full overflow-auto"
        style={{ paddingBottom: 'var(--bottom-nav-height, 3.625rem)' }}
      >
        {children}
      </div>
      <BottomNavController />
    </BottomNavLayoutProvider>
  );
}
