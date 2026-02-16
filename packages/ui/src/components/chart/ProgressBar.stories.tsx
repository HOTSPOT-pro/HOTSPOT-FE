import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  argTypes: {
    label: {
      control: 'text',
      description: '데이터 이름 (YAxis 키)',
    },
    total: {
      control: { min: 1, type: 'number' },
      description: '전체 기준 수치',
    },
    value: {
      control: { min: 0, type: 'number' },
      description: '현재 수치',
    },
  },
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div className="p-4 w-100">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Chart/ProgressBar',
};

// biome-ignore lint/style/noDefaultExport: <explanation>
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    label: '진행률',
    total: 100,
    value: 45,
  },
};

export const Empty: Story = {
  args: {
    label: '빈 수치',
    total: 100,
    value: 0,
  },
};

export const Completed: Story = {
  args: {
    label: '최대 수치',
    total: 100,
    value: 100,
  },
};

export const MinimalValue: Story = {
  args: {
    label: '최소 수치',
    total: 100,
    value: 2,
  },
};
