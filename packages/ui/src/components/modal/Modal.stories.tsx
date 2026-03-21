import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '..';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['default', 'custom'],
    },
  },
  component: Modal,
  parameters: {
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#F3F4F6' },
        { name: 'dark', value: '#111827' },
      ],
    },
    layout: 'centered',
  },
  title: 'Components/Modal',
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    size: 'default',
  },
  render: (args) => (
    <Modal {...args}>
      <Modal.Header>
        <Modal.Title>알림</Modal.Title>
        <Modal.Description>이 작업은 되돌릴 수 없어요.</Modal.Description>
      </Modal.Header>

      <Modal.Content>
        <div className="text-sm text-gray-700">
          모달 콘텐츠 영역입니다. 필요한 내용을 여기에 배치하세요.
        </div>
      </Modal.Content>

      <Modal.Footer btnLayout="vertical">
        <Button variant="solid">확인</Button>
        <Button variant="ghost">취소</Button>
      </Modal.Footer>
    </Modal>
  ),
};

export const HorizontalActions: Story = {
  args: {
    size: 'default',
  },
  render: (args) => (
    <Modal {...args}>
      <Modal.Header>
        <Modal.Title>삭제하시겠어요?</Modal.Title>
        <Modal.Description>삭제하면 복구할 수 없습니다.</Modal.Description>
      </Modal.Header>

      <Modal.Footer btnLayout="horizontal">
        <Button variant="ghost">취소</Button>
        <Button variant="destructive">삭제</Button>
      </Modal.Footer>
    </Modal>
  ),
};

export const CustomSize: Story = {
  args: {
    className: 'w-[26rem]',
    size: 'custom',
  },
  render: (args) => (
    <Modal {...args}>
      <Modal.Header>
        <Modal.Title>프로필 업데이트</Modal.Title>
        <Modal.Description>변경사항을 저장할까요?</Modal.Description>
      </Modal.Header>

      <Modal.Content className="gap-2">
        <input
          className="h-10 rounded-md border border-gray-300 px-3 text-sm"
          placeholder="예: hotspot-user"
        />
      </Modal.Content>

      <Modal.Footer btnLayout="horizontal">
        <Button variant="outline">나중에</Button>
        <Button variant="solid">저장</Button>
      </Modal.Footer>
    </Modal>
  ),
};

export const TitleOnly: Story = {
  args: { size: 'default' },
  render: (args) => (
    <Modal {...args}>
      <Modal.Header>
        <Modal.Title>세션이 만료되었어요</Modal.Title>
      </Modal.Header>

      <Modal.Footer btnLayout="vertical">
        <Button variant="solid">다시 로그인</Button>
      </Modal.Footer>
    </Modal>
  ),
};
