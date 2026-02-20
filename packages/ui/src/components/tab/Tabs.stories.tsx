import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Tab } from './Tab';

const meta: Meta<typeof Tab> = {
  argTypes: {
    isFullWidth: {
      control: 'boolean',
    },
    variant: {
      control: 'radio',
      options: ['underline', 'segment'],
    },
  },
  component: Tab,
  tags: ['autodocs'],
  title: 'COMPONENTS/Tabs',
};

export default meta;
type Story = StoryObj<typeof Tab>;

const TabsTemplate = (args: any) => {
  const [activeValue, setActiveValue] = useState(args.items[0].value);
  return <Tab {...args} activeValue={activeValue} onTabChange={(val) => setActiveValue(val)} />;
};

export const PolicyPageTabs: Story = {
  args: {
    isFullWidth: true,
    items: [
      { label: '가족 정책', value: 'FAMILY' },
      { label: '정책 관리', value: 'MANAGEMENT' },
    ],
    variant: 'underline',
  },
  render: (args) => <TabsTemplate {...args} />,
};

export const MultiItemTabs: Story = {
  args: {
    isFullWidth: true,
    items: [
      { label: '전체', value: 'ALL' },
      { label: '사용 중', value: 'ACTIVE' },
      { label: '사용 안 함', value: 'INACTIVE' },
    ],
    variant: 'underline',
  },
  render: (args) => <TabsTemplate {...args} />,
};

export const ReportSegmentTabs: Story = {
  args: {
    isFullWidth: false,
    items: [
      { label: '일별', value: 'DAY' },
      { label: '월별', value: 'MONTH' },
    ],
    variant: 'segment',
  },
  render: (args) => <TabsTemplate {...args} />,
};
