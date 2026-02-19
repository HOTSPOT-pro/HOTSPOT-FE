import type { Meta, StoryObj } from '@storybook/nextjs';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  args: {
    description: '카드 설명 텍스트입니다.',
    heading: '카드 제목',
  },
  argTypes: {
    children: { control: false, description: '카드 내부 콘텐츠' },
    className: { control: 'text', description: '추가 클래스' },
    description: { control: 'text', description: '카드 설명' },
    heading: { control: 'text', description: '카드 제목' },
    onClick: { action: 'clicked', description: '클릭 이벤트' },
  },
  component: Card,
  decorators: [
    (Story) => (
      <div className="w-full p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Card',
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => <Card {...args} />,
};

export const WithImage: Story = {
  args: {
    children: (
      <div className="h-40 w-full bg-linear-to-br from-emerald-200 via-cyan-200 to-blue-300" />
    ),
    className: 'overflow-hidden',
    description: undefined,
    heading: '이미지 카드',
  },
};
