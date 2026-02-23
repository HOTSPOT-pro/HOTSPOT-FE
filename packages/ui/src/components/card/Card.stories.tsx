import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '..';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta: Meta<typeof Card> = {
  argTypes: {
    children: { control: false, description: '카드 내부 콘텐츠' },
    className: { control: 'text', description: '추가 클래스' },
    onClick: { action: 'clicked', description: '클릭 이벤트' },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명 텍스트입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">콘텐츠 영역입니다.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>이미지 카드</CardTitle>
        <CardDescription>이미지와 텍스트를 함께 배치한 카드입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-40 w-full bg-linear-to-br from-emerald-200 via-cyan-200 to-blue-300" />
      </CardContent>
    </Card>
  ),
};

export const WithFooterAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>결제 정보</CardTitle>
        <CardDescription>이번 달 사용 금액을 확인하고 저장하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">총 사용액: 128,000원</div>
      </CardContent>
      <CardFooter>
        <Button>저장</Button>
      </CardFooter>
    </Card>
  ),
};
