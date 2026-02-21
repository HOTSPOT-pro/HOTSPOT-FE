import type { Meta, StoryObj } from '@storybook/nextjs';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  component: Loading,
  decorators: [
    (Story) => (
      <div className="flex min-h-[120px] w-full items-center justify-center p-6 text-purple-600">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Loading',
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {};
