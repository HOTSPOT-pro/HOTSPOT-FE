'use client';

import { Button, Modal } from '@hotspot/ui';
import { useDeleteSubscribe } from '../model/useDeleteSubscribe';

export const CancelSubscribeModal = ({ close }: { close: () => void }) => {
  const { cancelSubscribe } = useDeleteSubscribe();
  const handleCancelSubscribe = () => {
    cancelSubscribe.mutate();
    close();
  };

  return (
    <Modal className="w-100">
      <Modal.Header>
        <Modal.Title className="break-keep">구독을 취소하시겠어요?</Modal.Title>
        <Modal.Description>가족 전원의 서비스 이용이 중단됩니다.</Modal.Description>
      </Modal.Header>
      <Modal.Footer btnLayout="horizontal">
        <Button disabled={cancelSubscribe.isPending} onClick={close} variant="ghost">
          취소
        </Button>
        <Button
          isLoading={cancelSubscribe.isPending}
          onClick={handleCancelSubscribe}
          variant="destructive"
        >
          삭제하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
