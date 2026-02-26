'use client';

import { Button, useModal } from '@hotspot/ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const HomePage = () => {
  const { open } = useModal();
  const router = useRouter();

  const handleOpenModal = useCallback(() => {
    open('testmodal');
  }, [open]);

  return (
    <div>
      <Button onClick={handleOpenModal}>모달 열기</Button>
      <span className="text-red-500">안녕</span>
      <Button
        onClick={() => {
          router.push('/me/policy');
        }}
      >
        정책 페이지로
      </Button>
    </div>
  );
};
