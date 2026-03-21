import type { Meta, StoryObj } from '@storybook/nextjs';
import { SelectField } from './SelectField';

const meta: Meta<typeof SelectField> = {
  args: {
    className: 'bg-white border border-gray-200',
    desc: '선택한 항목에 따라 다음 단계가 달라집니다.',
    heading: '카테고리 선택',
  },
  argTypes: {
    className: { control: 'text', description: '추가 클래스' },
    desc: { control: 'text', description: '보조 설명' },
    heading: { control: 'text', description: '메인 타이틀' },
    leftSlot: { control: false, description: '좌측 슬롯' },
    onClick: { action: 'clicked', description: '클릭 이벤트' },
    rightSlot: { control: false, description: '우측 슬롯' },
  },
  component: SelectField,
  decorators: [
    (Story) => (
      <div className="w-[360px] bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/SelectField',
};

export default meta;

type Story = StoryObj<typeof SelectField>;

export const Default: Story = {
  args: {
    leftSlot: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
        A
      </div>
    ),
  },
};

export const WithoutDescription: Story = {
  args: {
    className: 'bg-purple-50 border border-purple-200',
    desc: undefined,
    heading: '프로필 설정',
    leftSlot: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-purple-700">
        P
      </div>
    ),
  },
};
