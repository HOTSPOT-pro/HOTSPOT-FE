import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  argTypes: {
    onClear: { action: 'cleared' }, // Storybook 액션 로그에서 확인 가능
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'tel'],
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
    description: '이름을 입력하세요',
    id: 'name-input',
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
    id: 'password-input',
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
    id: 'email-validation',
    label: '이메일',
    placeholder: 'example@email.com',
    type: 'email',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('올바른 이메일 형식이 아닙니다.');
      } else {
        setError('');
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      validateEmail(newValue);
    };

    const handleClear = () => {
      setValue('');
      setError('이메일을 입력해 주세요.');
    };

    return (
      <Input {...args} error={error} onChange={handleChange} onClear={handleClear} value={value} />
    );
  },
};

export const Numbers: Story = {
  args: {
    id: 'number-input',
    label: '데이터량 (GB)',
    placeholder: '숫자만 입력 가능',
    type: 'number',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('0')}
        value={value}
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: '초기값입니다',
    id: 'uncontrolled-input',
    label: '비제어 인풋 (Ref 사용)',
    placeholder: '수정 후 콘솔을 확인하세요',
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-2">
        <Input {...args} />
        <p className="text-xs text-gray-400 mt-2">
          * 비제어 방식은 별도의 state 연결 없이 defaultValue와 ref로만 동작.
        </p>
      </div>
    );
  },
};
