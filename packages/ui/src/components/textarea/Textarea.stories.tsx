import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  argTypes: {
    // 제어하기 쉬운 속성들을 컨트롤러로 노출
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
  component: Textarea,
  tags: ['autodocs'],
  title: 'COMPONENTS/Textarea',
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// 제어 컴포넌트 상태를 관리하기 위한 템플릿
const TextareaTemplate = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return <Textarea {...args} onChange={(e) => setValue(e.target.value)} value={value} />;
};

export const Default: Story = {
  args: {
    id: 'default-textarea',
    label: '메모',
    placeholder: '내용을 입력해주세요.',
  },
  render: (args) => <TextareaTemplate {...args} />,
};

export const WithDescription: Story = {
  args: {
    description: '최대 500자까지 입력 가능합니다.',
    id: 'description-textarea',
    label: '자기소개',
    placeholder: '자신에 대해 알려주세요.',
  },
  render: (args) => <TextareaTemplate {...args} />,
};

export const ErrorState: Story = {
  args: {
    error: '내용이 너무 짧습니다. 최소 10자 이상 입력해주세요.',
    id: 'error-textarea',
    label: '피드백',
    placeholder: '피드백을 남겨주세요.',
    value: '짧은 글',
  },
  render: (args) => <TextareaTemplate {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'disabled-textarea',
    label: '수정 불가 항목',
    value: '이 내용은 수정할 수 없습니다.',
  },
};

export const CustomStyle: Story = {
  args: {
    className: 'min-h-[200px] bg-gray-50 p-4 rounded-md',
    id: 'custom-textarea',
    label: '커스텀 스타일 (높이 고정)',
    placeholder: 'className을 통해 스타일을 확장할 수 있습니다.',
  },
  render: (args) => <TextareaTemplate {...args} />,
};
