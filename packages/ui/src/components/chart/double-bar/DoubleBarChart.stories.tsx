import type { Meta, StoryObj } from '@storybook/nextjs';
import { DoubleBarChart } from './DoubleBarChart';

const meta: Meta<typeof DoubleBarChart> = {
  argTypes: {
    unit: { control: 'text', description: '축/툴팁 단위' },
  },
  component: DoubleBarChart,
  decorators: [
    (Story) => (
      <div className="h-[320px] w-full max-w-[640px] bg-white p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/DoubleBarChart',
};

export default meta;

type Story = StoryObj<typeof DoubleBarChart>;

export const WeeklyUsage: Story = {
  args: {
    data: [
      { label: '월', lastWeek: 2.1, thisWeek: 3.4 },
      { label: '화', lastWeek: 1.8, thisWeek: 2.2 },
      { label: '수', lastWeek: 3.2, thisWeek: 2.9 },
      { label: '목', lastWeek: 2.7, thisWeek: 4.1 },
      { label: '금', lastWeek: 3.9, thisWeek: 4.6 },
    ],
    unit: 'GB',
  },
};

export const SmallValues: Story = {
  args: {
    data: [
      { label: '1주', lastWeek: 0.3, thisWeek: 0.6 },
      { label: '2주', lastWeek: 0.5, thisWeek: 0.4 },
      { label: '3주', lastWeek: 0.2, thisWeek: 0.8 },
      { label: '4주', lastWeek: 0.7, thisWeek: 0.9 },
    ],
    unit: 'h',
  },
};
