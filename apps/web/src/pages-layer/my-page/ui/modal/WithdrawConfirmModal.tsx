'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/domains/user/store/useUserStore';
import { api } from '@/shared/api/client';
import { ROUTES } from '@/shared/constants/routes';

export const WithdrawConfirmModal = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const { open } = useModal();
  const { clearUser } = useUserStore();

  const withdrawMutation = useMutation({
    mutationFn: () => api.post('/api/v1/auth/withdraw'),
    onError: () => {
      close();
      open('errorModal', {
        props: {
          content: '회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.',
          onConfirm: () => undefined,
          title: '오류',
        },
      });
    },
    onSuccess: () => {
      clearUser();
      close();
      router.replace(ROUTES.LOGIN);
    },
  });

  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>정말 탈퇴하시겠어요?</Modal.Title>
        <Modal.Description className="whitespace-pre-line">
          {'탈퇴하시면 가족에서 사라지고 계정이 삭제됩니다.'}
        </Modal.Description>
      </Modal.Header>
      <Modal.Footer btnLayout="horizontal">
        <Button disabled={withdrawMutation.isPending} onClick={close} variant="ghost">
          취소
        </Button>
        <Button
          isLoading={withdrawMutation.isPending}
          onClick={() => withdrawMutation.mutate()}
          variant="destructive"
        >
          탈퇴하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
