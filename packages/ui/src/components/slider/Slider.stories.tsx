import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Slider } from '..';

type SliderProps = ComponentProps<typeof Slider>;

const meta: Meta<typeof Slider> = {
  argTypes: {
    className: { control: 'text' },
    initialValue: {
      control: { type: 'number' },
      description: '초기 설정값',
    },
    maxNum: {
      control: { type: 'number' },
      description: '슬라이더의 최대값',
    },
    minNum: {
      control: { type: 'number' },
      description: '슬라이더의 최소값',
    },
    onChange: {
      action: 'changed',
      description: '값이 변경될 때 호출되는 콜백 함수',
    },
  },
  component: Slider,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '2rem', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Slider',
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    initialValue: 50,
    maxNum: 100,
    minNum: 0,
    step: 5,
  },
};

export const StorageSize: Story = {
  args: {
    initialValue: 128,
    maxNum: 512,
    minNum: 0,
  },
};

export const Interactive: Story = {
  args: {
    initialValue: 250,
    maxNum: 1000,
    minNum: 0,
  },
  render: (args: SliderProps) => {
    const [currentValue, setCurrentValue] = useState(args.initialValue ?? args.minNum);

    return (
      <div className="flex flex-col gap-6">
        <div className="p-4 bg-purple-50 text-purple-700 rounded-lg text-center font-bold border border-purple-100">
          선택된 용량: {currentValue} GB
        </div>
        <Slider
          {...args}
          initialValue={currentValue}
          onChange={(val: any) => {
            setCurrentValue(val);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
};
