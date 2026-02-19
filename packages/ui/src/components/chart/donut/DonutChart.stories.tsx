import type { Meta, StoryObj } from '@storybook/nextjs';
import { DonutChartContainer } from './DonutChartContainer';

const meta: Meta<typeof DonutChartContainer> = {
  argTypes: {
    type: {
      control: 'radio',
      options: ['MOBILE', 'WEB'],
    },
  },
  component: DonutChartContainer,
  // 중앙 정렬을 위한 데코레이터 (선택 사항)
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'CHART/DonutChartContainer', // FSD 계층에 따른 경로 설정
};

// biome-ignore lint/style/noDefaultExport: <storybook 테스트>
export default meta;
type Story = StoryObj<typeof DonutChartContainer>;

// 1. 모바일 뷰 (기본값)
export const Mobile: Story = {
  args: {
    data: [
      { name: '앱 사용', value: 35 },
      { name: '시스템', value: 15 },
      { name: '기타', value: 10 },
    ],
    total: 100,
    type: 'MOBILE',
  },
};

// 2. 웹 뷰 (세로 배치)
export const Web: Story = {
  args: {
    ...Mobile.args,
    type: 'WEB',
  },
};

// 3. 데이터가 가득 찬 경우 (잔여 0)
export const FullData: Story = {
  args: {
    data: [
      { name: '비디오', value: 30 },
      { name: '사진', value: 20 },
    ],
    total: 50,
    type: 'MOBILE',
  },
};

// 4. 데이터가 하나만 있는 경우 (색상 보간 테스트)
export const SingleData: Story = {
  args: {
    data: [{ name: '단일 데이터', value: 45 }],
    total: 100,
    type: 'MOBILE',
  },
};
