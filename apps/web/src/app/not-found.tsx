import { Button } from '@hotspot/ui';
import WowAnimatedCharacter from '@hotspot/ui/assets/images/character/sporty-wow-animated.svg';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-semibold">404 Not Found</h1>
      <p className="text-sm text-gray-600">요청하신 페이지를 찾을 수 없습니다.</p>
      <WowAnimatedCharacter />
      <Button className="w-50">
        <Link className="flex w-full h-full items-center justify-center" href={ROUTES.HOME}>
          홈으로 이동
        </Link>
      </Button>
    </main>
  );
}
