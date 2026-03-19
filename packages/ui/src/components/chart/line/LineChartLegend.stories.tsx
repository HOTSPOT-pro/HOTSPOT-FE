import type { Meta, StoryObj } from '@storybook/nextjs';
import { LineChartLegend } from './LineChartLegend';

const meta: Meta<typeof LineChartLegend> = {
  argTypes: {
    payload: { control: false, description: 'Recharts legend payload' },
  },
  component: LineChartLegend,
  decorators: [
    (Story) => (
      <div className="w-full max-w-[420px] rounded-xl bg-white p-6">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/LineChartLegend',
};

export default meta;

type Story = StoryObj<typeof LineChartLegend>;

export const Default: Story = {
  args: {
    payload: [
      { color: '#141414', value: '내 사용량' },
      { color: '#7c3aed', value: '전체 사용량' },
    ],
  },
};
