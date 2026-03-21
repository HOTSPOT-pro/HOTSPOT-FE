'use client';

import { Button, Modal } from '@hotspot/ui/components';

export const TestAlertModal = ({ close }: { close: () => void }) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>알림</Modal.Title>
        <Modal.Description>버튼 클릭으로 모달이 열렸습니다.</Modal.Description>
      </Modal.Header>
      <Modal.Footer btnLayout="horizontal">
        <Button onClick={close} variant="ghost">
          취소
        </Button>
        <Button onClick={close}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
};
