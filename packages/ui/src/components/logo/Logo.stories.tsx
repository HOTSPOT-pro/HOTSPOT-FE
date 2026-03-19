import type { Meta, StoryObj } from '@storybook/nextjs';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  argTypes: {
    size: {
      control: { type: 'radio' },
      description: '로고 크기',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
  component: Logo,
  decorators: [
    (Story) => (
      <div className="flex min-h-[180px] items-center justify-center bg-gray-50 p-6">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Logo',
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const ScaleSet: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Logo size="xs" />
      <Logo size="sm" />
      <Logo size="md" />
      <Logo size="lg" />
    </div>
  ),
};
