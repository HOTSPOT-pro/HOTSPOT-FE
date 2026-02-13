import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  args: {
    appName: 'web',
    children: 'Click me',
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Button',
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const AdminButton: Story = {
  args: {
    appName: 'admin',
    children: 'Open admin',
  },
};

export const WithClassName: Story = {
  args: {
    appName: 'web',
    children: 'Styled button',
    className:
      'rounded-md bg-white px-4 py-2 text-sm font-medium text-white transition hover:opacity-80',
  },
};
