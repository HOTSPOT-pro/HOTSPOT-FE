'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useGift } from '../model/useGift';

interface PresentConfirmModalProps {
  selectedFamily: number | null;
  presentAmount: number;
  [key: string]: unknown;
}

export const PresentConfirmModal = ({ close }: { close: () => void }) => {
  const { getProps, open } = useModal();
  const props = getProps<PresentConfirmModalProps>();
  const { presentData } = useGift();

  const handleSendPresent = async () => {
    if (props?.selectedFamily === null || !props?.presentAmount) return;

    try {
      await presentData.mutateAsync({
        dataAmount: props.presentAmount,
        targetSubId: props.selectedFamily,
      });
      close();
    } catch (error: any) {
      const errorData = error?.response?.data;
      const errorCode = errorData?.code;
      const errorMessage = errorData?.message || '오류가 발생했습니다. 나중에 다시 시도해주세요.';
      close();

      if (errorCode === 'PRESENT_004') {
        //TODO: Error Code 모아두기
        open('errorModal', {
          props: {
            content: errorMessage,
            title: '선물 한도 초과',
          },
        });
      } else {
        open('errorModal', {
          props: {
            content: errorMessage,
            title: '오류',
          },
        });
      }
    }
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
