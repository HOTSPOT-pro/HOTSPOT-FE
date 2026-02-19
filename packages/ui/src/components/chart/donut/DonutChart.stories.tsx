import type { Meta, StoryObj } from '@storybook/nextjs';
import { DonutChart } from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  argTypes: {
    data: { control: 'object' },
    total: { control: 'number' },
  },
  component: DonutChart,
  decorators: [
    (Story) => (
      <div className="w-75 h-75 @container flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/DonutChart',
};

export default meta;

type Story = StoryObj<typeof DonutChart>;

export const Default: Story = {
  args: {
    data: [
      { name: '엄마', value: 25.4 },
      { name: '아빠', value: 18.2 },
      { name: '나', value: 12.9 },
      { name: '동생', value: 8.5 },
    ],
    remaining: 34.3,
    total: 100,
    totalUsed: 65.7,
  },
};

export const OverCapacity: Story = {
  args: {
    data: [{ name: '과사용자', value: 65.7 }],
    total: 50,
  },
};
