import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '../button/Button';
import { Modal } from './Modal';
import { ModalProvider, useModal } from './ModalContext';
import { ModalRootRenderer } from './ModalRootRenderer';

const DemoModal = ({ close, props }: { close: () => void; props?: Record<string, unknown> }) => (
  <Modal>
    <Modal.Header>
      <Modal.Title>{String(props?.title ?? '확인')}</Modal.Title>
      <Modal.Description>
        {String(props?.description ?? '모달 루트 렌더러 예시입니다.')}
      </Modal.Description>
    </Modal.Header>
    <Modal.Footer btnLayout="horizontal">
      <Button onClick={close} variant="ghost">
        닫기
      </Button>
      <Button onClick={close}>확인</Button>
    </Modal.Footer>
  </Modal>
);

const Trigger = () => {
  const { open } = useModal();

  return (
    <Button
      onClick={() =>
        open('demo-modal', {
          props: {
            description: 'registry 기반으로 포털에 렌더링됩니다.',
            title: '등록된 모달',
          },
        })
      }
    >
      모달 열기
    </Button>
  );
};

const meta: Meta<typeof ModalRootRenderer> = {
  argTypes: {
    registry: { control: false, description: '모달 컴포넌트 레지스트리' },
  },
  component: ModalRootRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/ModalRootRenderer',
};

export default meta;

type Story = StoryObj<typeof ModalRootRenderer>;

export const Default: Story = {
  args: {
    registry: {
      'demo-modal': DemoModal,
    },
  },
  render: (args) => (
    <ModalProvider>
      <div className="flex min-h-[180px] items-center justify-center">
        <Trigger />
      </div>
      <ModalRootRenderer {...args} />
    </ModalProvider>
  ),
};
