import { AuthSyncGate } from '@/app/_providers/auth/AuthSyncGate';
import { BottomNavController } from '@/widgets/app-bottom-nav';
import { DEFAULT_BOTTOM_NAV_HEIGHT } from '@/widgets/app-bottom-nav/constants/navHeight';
import { BottomNavLayoutProvider } from '@/widgets/app-bottom-nav/ui/BottomNavLayoutContext';
import { NotificationSubscribeProvider } from '../_providers';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BottomNavLayoutProvider>
      <AuthSyncGate>
        <NotificationSubscribeProvider />
        <div
          className="flex flex-1 min-h-0 flex-col overflow-auto"
          style={{
            paddingBottom: `var(--bottom-nav-height, ${DEFAULT_BOTTOM_NAV_HEIGHT}px)`,
          }}
        >
          {children}
        </div>
        <BottomNavController />
      </AuthSyncGate>
    </BottomNavLayoutProvider>
  );
}
