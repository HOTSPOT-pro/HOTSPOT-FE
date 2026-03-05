import { Button, Modal, useModal } from '@hotspot/ui';

interface ErrorModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  [key: string]: unknown;
}

export const ErrorModal = () => {
  const { getProps, close } = useModal();
  const props = getProps<ErrorModalProps>();

  const handleConfirm = () => {
    close();
    if (props?.onConfirm) {
      props.onConfirm();
    }
  };

  return (
    <Modal>
      <Modal.Header>
        <p className="text-center font-bold text-base text-black">{props?.title}</p>
      </Modal.Header>
      <Modal.Content>
        <span className="text-center text-xs text-gray-600">{props?.content}</span>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={handleConfirm}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
};
