'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useGift } from '../model/useGift';

interface PresentConfirmModalProps {
  selectedFamily: number | null;
  presentAmount: number;
  [key: string]: unknown;
}

export const PresentConfirmModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const props = getProps<PresentConfirmModalProps>();
  const { presentData } = useGift();

  const handleSendPresent = () => {
    if (props?.selectedFamily !== null && props?.presentAmount)
      presentData.mutate(
        { dataAmount: props.presentAmount, targetSubId: props.selectedFamily },
        { onSuccess: close },
      );
  };

  return (
    <Modal className="max-w-125">
      <Modal.Header>
        <Modal.Title>데이터를 선물하시겠어요?</Modal.Title>
        <Modal.Description>현재 사용 가능한 데이터에서 차감됩니다.</Modal.Description>
      </Modal.Header>
      <Modal.Footer btnLayout="horizontal">
        <Button onClick={close} variant="ghost">
          취소
        </Button>
        <Button isLoading={presentData.isPending} onClick={handleSendPresent}>
          선물하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
