'use client';

import { Button, Modal } from '@hotspot/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserStore } from '@/entities/user/store/useUserStore';
import { api } from '@/shared/api/client';
import { ROUTES } from '@/shared/constants/routes';

export const LogoutConfirmModal = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await api.post('/api/v1/auth/logout');
    } finally {
      clearUser();
      close();
      router.replace(ROUTES.LOGIN);
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>로그아웃 하시겠어요?</Modal.Title>
        <Modal.Description>현재 계정에서 로그아웃됩니다.</Modal.Description>
      </Modal.Header>
      <Modal.Footer btnLayout="horizontal">
        <Button onClick={close} variant="ghost">
          취소
        </Button>
        <Button isLoading={isLoading} onClick={() => void handleLogout()}>
          로그아웃
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
