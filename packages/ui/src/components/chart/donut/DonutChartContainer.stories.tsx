import type { Meta, StoryObj } from '@storybook/nextjs';
import { DonutChartContainer } from './DonutChartContainer';

const meta: Meta<typeof DonutChartContainer> = {
  component: DonutChartContainer,
  decorators: [
    (Story) => (
      <div className="flex justify-center bg-white p-6">
        <div className="w-full max-w-[420px]">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/DonutChartContainer',
};

export default meta;

type Story = StoryObj<typeof DonutChartContainer>;

export const Default: Story = {
  args: {
    data: [
      { name: '동영상', value: 12 },
      { name: 'SNS', value: 8 },
      { name: '기타', value: 5 },
    ],
    total: 40,
    totalLabel: '전체 데이터',
    totalUsedLabel: '사용량',
  },
};
