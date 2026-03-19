import type { Meta, StoryObj } from '@storybook/nextjs';
import { Overlay } from './Overlay';

const meta: Meta<typeof Overlay> = {
  argTypes: {
    className: { control: 'text', description: '추가 클래스' },
    isVisible: { control: 'boolean', description: '오버레이 노출 여부' },
    onClick: { action: 'clicked', description: '오버레이 클릭 이벤트' },
  },
  component: Overlay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Components/Overlay',
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Visible: Story = {
  args: {
    isVisible: true,
  },
  render: (args) => (
    <div className="relative min-h-screen bg-gray-100">
      <div className="mx-auto flex min-h-screen max-w-[500px] items-center justify-center bg-white text-sm text-gray-500">
        Overlay background
      </div>
      <Overlay {...args} />
    </div>
  ),
};

export const Hidden: Story = {
  args: {
    isVisible: false,
  },
  render: Visible.render,
};
