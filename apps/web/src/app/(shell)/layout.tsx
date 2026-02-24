import { BottomNavController } from '@/widgets/app-bottom-nav';
import { DEFAULT_BOTTOM_NAV_HEIGHT } from '@/widgets/app-bottom-nav/constants/navHeight';
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
        style={{
          paddingBottom: `var(--bottom-nav-height, ${DEFAULT_BOTTOM_NAV_HEIGHT}px)`,
        }}
      >
        {children}
      </div>
      <BottomNavController />
    </BottomNavLayoutProvider>
  );
}
