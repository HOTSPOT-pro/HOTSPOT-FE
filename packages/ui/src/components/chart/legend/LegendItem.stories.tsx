import type { Meta, StoryObj } from '@storybook/nextjs';
import { LegendItem } from './LegendItem';

const meta: Meta<typeof LegendItem> = {
  argTypes: {
    className: { control: 'text', description: '추가 클래스' },
    color: { control: 'color', description: '범례 색상' },
    name: { control: 'text', description: '범례 이름' },
    valueText: { control: 'text', description: '오른쪽 값 텍스트' },
  },
  component: LegendItem,
  decorators: [
    (Story) => (
      <div className="w-[260px] rounded-xl bg-white p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/LegendItem',
};

export default meta;

type Story = StoryObj<typeof LegendItem>;

export const Default: Story = {
  args: {
    color: '#7c3aed',
    name: '앱 사용',
    valueText: '12.4GB',
  },
};

export const LabelOnly: Story = {
  args: {
    color: '#10b981',
    name: '잔여량',
  },
};
