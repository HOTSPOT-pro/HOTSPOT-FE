import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Input } from './Input'; // 경로에 맞게 수정하세요

const meta: Meta<typeof Input> = {
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'tel', 'date'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'COMPONENTS/Input',
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    type: 'text',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        value={value}
      />
    );
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        value={value}
      />
    );
  },
};

export const ErrorState: Story = {
  args: {
    error: '올바른 이메일 형식이 아닙니다.',
    label: '이메일',
    type: 'email',
    value: 'invalid-email',
  },
};

export const Nums: Story = {
  args: {
    label: '데이터량',
    max: 100,
    min: 0,
    type: 'number',
    value: '25',
  },
  render: (args) => {
    // 1. args.value가 readonly string[]이 아님을 확실히 해줍니다.
    const [value, setValue] = useState<string | number>((args.value as string | number) ?? '');

    return <Input {...args} onChange={(e) => setValue(e.target.value)} value={value} />;
  },
};
