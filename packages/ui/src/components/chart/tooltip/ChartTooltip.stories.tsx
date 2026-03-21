import type { Meta, StoryObj } from '@storybook/nextjs';
import { ChartTooltip } from './ChartTooltip';

const meta: Meta<typeof ChartTooltip> = {
  argTypes: {
    header: { control: 'text', description: '상단 헤더' },
    sections: { control: false, description: '표시할 섹션 목록' },
  },
  component: ChartTooltip,
  decorators: [
    (Story) => (
      <div className="flex min-h-[180px] items-center justify-center bg-gray-50 p-6">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/ChartTooltip',
};

export default meta;

type Story = StoryObj<typeof ChartTooltip>;

export const Default: Story = {
  args: {
    header: '3월 사용량',
    sections: [
      { title: '전체 사용량', unit: 'GB', value: '12.4' },
      { dividerTop: true, title: '개별 사용량', unit: 'GB', value: '4.6' },
    ],
  },
};

export const Headerless: Story = {
  args: {
    sections: [
      { title: '이번주', unit: 'GB', value: '8.2' },
      { dividerTop: true, title: '지난주', unit: 'GB', value: '6.9' },
    ],
  },
};
