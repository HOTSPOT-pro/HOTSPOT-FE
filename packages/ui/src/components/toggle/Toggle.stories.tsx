import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Toggle } from './Toggle';

type ToggleProps = ComponentProps<typeof Toggle>;

const meta: Meta<typeof Toggle> = {
  argTypes: {
    checked: { control: 'boolean', description: '토글의 체크 여부' },
    className: { control: 'text' },
    disabled: { control: 'boolean', description: '비활성화 상태' },
    id: { control: 'text', description: 'input 요소의 고유 ID' },
    onChange: { action: 'changed', description: '상태가 변경될 때 호출되는 콜백 함수' },
  },
  component: Toggle,
  tags: ['autodocs'],
  title: 'Components/Toggle',
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    checked: false,
    id: 'toggle-default',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    id: 'toggle-checked',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    id: 'toggle-disabled',
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    id: 'toggle-disabled',
  },
};

export const Interactive: Story = {
  args: {
    checked: false,
    id: 'toggle-interactive',
  },
  render: (args: ToggleProps) => {
    const [isChecked, setIsChecked] = useState(args.checked ?? false);

    return (
      <div className="flex items-center gap-4">
        <Toggle
          {...args}
          checked={isChecked}
          onChange={(checked) => {
            setIsChecked(checked);
            args.onChange?.(checked);
          }}
        />
        <span className="text-sm font-medium text-gray-700">상태: {isChecked ? 'ON' : 'OFF'}</span>
      </div>
    );
  },
};
