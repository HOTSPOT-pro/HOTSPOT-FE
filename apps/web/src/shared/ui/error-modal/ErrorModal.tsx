import { Button, Modal, useModal } from '@hotspot/ui';

interface ErrorModalProps {
  title: string;
  content: string;
  [key: string]: unknown;
}

export const ErrorModal = () => {
  const { getProps, close } = useModal();
  const props = getProps<ErrorModalProps>();

  return (
    <Modal>
      <Modal.Header>
        <p>{props?.title}</p>
      </Modal.Header>
      <Modal.Content>{props?.content}</Modal.Content>
      <Modal.Footer>
        <Button onClick={close}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
};
