import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  args: {
    children: '버튼',
    variant: 'solid',
  },
  argTypes: {
    children: { control: 'text', description: '버튼 라벨' },
    className: { control: 'text', description: '추가 클래스' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    onClick: { action: 'clicked', description: '클릭 이벤트' },
    type: {
      control: { type: 'select' },
      description: '버튼 타입',
      options: ['button', 'submit', 'reset'],
    },
    variant: {
      control: { type: 'select' },
      description: '버튼 스타일 변형',
      options: ['solid', 'outline', 'ghost', 'destructive'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Solid: Story = {
  args: {
    children: 'Solid button',
    variant: 'solid',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost button',
    variant: 'ghost',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const WithClassName: Story = {
  args: {
    children: 'Custom class',
    className:
      'rounded-full px-6 py-2 font-semibold tracking-wide bg-emerald-600 text-white hover:bg-emerald-500',
  },
};
