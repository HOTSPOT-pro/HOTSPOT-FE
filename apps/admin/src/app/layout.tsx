import type { Metadata } from 'next';
import '@hotspot/ui/globals.css';
import { ModalProvider } from '@hotspot/ui';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppModal } from '@/widgets/app-modal/ui/AppModal';
import { QueryProvider } from './_providers/query/QueryProvider';

export const metadata: Metadata = {
  description: 'HOTSPOT',
  title: 'HOTSPOT Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/android-chrome-192x192.png" rel="icon" sizes="192x192" type="image/png" />
        <link href="/android-chrome-512x512.png" rel="icon" sizes="512x512" type="image/png" />
        <meta content="#ffffff" name="theme-color" />
      </head>
      <body>
        <QueryProvider>
          <ModalProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <AppModal />
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
