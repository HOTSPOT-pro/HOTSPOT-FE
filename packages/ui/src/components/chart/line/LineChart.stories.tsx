import type { Meta, StoryObj } from '@storybook/nextjs';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['MONTH', 'DAY'],
    },
    unit: {
      control: 'text',
    },
  },
  component: LineChart,
  decorators: [
    (Story) => (
      <div style={{ height: '400px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Chart/LineChart',
};

// biome-ignore lint/style/noDefaultExport: <storybook 테스트>
export default meta;
type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {
    data: [
      { date: '1', personal: 40, personalRatio: 40, total: 65, totalRatio: 65 },
      { date: '2', personal: 30, personalRatio: 30, total: 55, totalRatio: 55 },
      { date: '3', personal: 50, personalRatio: 50, total: 85, totalRatio: 85 },
      { date: '4', personal: 20, personalRatio: 20, total: 45, totalRatio: 45 },
      { date: '5', personal: 70, personalRatio: 70, total: 95, totalRatio: 95 },
      { date: '6', personal: 45, personalRatio: 45, total: 70, totalRatio: 70 },
      { date: '7', personal: 55, personalRatio: 55, total: 80, totalRatio: 80 },
    ],
    max: 100,
    type: 'DAY',
    unit: 'GB',
  },
};

export const TotalOnly: Story = {
  args: {
    data: [
      { date: '1', total: 20, totalRatio: 20 },
      { date: '2', total: 45, totalRatio: 45 },
      { date: '3', total: 30, totalRatio: 30 },
      { date: '4', total: 75, totalRatio: 75 },
    ],
    max: 100,
    type: 'MONTH',
    unit: 'GB',
  },
};

export const MonthlyUsage: Story = {
  args: {
    data: Array.from({ length: 12 }, (_, i) => ({
      date: `${i + 1}`,
      personal: Math.floor(Math.random() * 100) + 50,
      personalRatio: 20,
      total: Math.floor(Math.random() * 400) + 100,
      totalRatio: 80,
    })),
    max: 500,
    type: 'MONTH',
    unit: 'TB',
  },
};
