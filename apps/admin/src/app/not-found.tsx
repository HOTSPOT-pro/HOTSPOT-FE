import { Logo } from '@hotspot/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <Logo size="lg" />
      <h1 className="text-4xl font-semibold">404 Not Found</h1>
      <p className="text-sm text-gray-600">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100" href="/families">
        홈으로 이동
      </Link>
    </main>
  );
}
