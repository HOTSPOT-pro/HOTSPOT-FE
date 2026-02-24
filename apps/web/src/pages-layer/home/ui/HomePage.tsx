'use client';

import { Button, useModal } from '@hotspot/ui';
import { useCallback } from 'react';

export const HomePage = () => {
  const { open } = useModal();

  const handleOpenModal = useCallback(() => {
    open('testmodal');
  }, [open]);

  return (
    <div>
      <Button onClick={handleOpenModal}>모달 열기</Button>
      <span className="text-red-500">안녕</span>
    </div>
  );
};
