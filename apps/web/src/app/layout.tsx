import type { Metadata } from 'next';
import '@hotspot/ui/globals.css';
import { ModalProvider } from '@hotspot/ui';
import { StoreProvider } from '@/app/_providers';
import { AppModal } from '@/widgets/app-modal/ui/AppModal';
import { PopUpProvider } from '@/widgets/app-popup/model/PopUpContext';
import { AppPopUp } from '@/widgets/app-popup/ui/AppPopUp';
import { QueryProvider } from './_providers/query/QueryProvider';

export const metadata: Metadata = {
  description:
    'HOTSPOT에서 가족의 데이터 사용을 한눈에 확인하고, 실시간으로 관리해보세요. 가족 간 데이터를 더욱 심플하게 활용할 수 있습니다.',
  title: 'HOTSPOT',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="ko">
      <head>
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/android-chrome-192x192.png" rel="icon" sizes="192x192" type="image/png" />
        <link href="/android-chrome-512x512.png" rel="icon" sizes="512x512" type="image/png" />
        <meta content="#ffffff" name="theme-color" />
      </head>
      <body className="min-h-dvh min-w-full bg-gray-200">
        <StoreProvider>
          <QueryProvider>
            <ModalProvider>
              <PopUpProvider>
                <div className="mx-auto flex min-h-dvh w-full justify-center">
                  <main className="flex min-h-dvh w-full max-w-[500px] flex-col bg-white shadow-[0_0_8px_rgba(0,0,0,0.16)]">
                    {children}
                  </main>
                </div>
                <AppModal />
                <AppPopUp />
              </PopUpProvider>
            </ModalProvider>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
