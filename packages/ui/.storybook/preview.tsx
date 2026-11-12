import type { Preview } from '@storybook/react-vite';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-mono/400.css';
import '../src/styles/index.css';
import { PancakeProvider } from '../src';

const preview: Preview = {
  decorators: [
    (Story) => (
      <PancakeProvider>
        <Story />
      </PancakeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    options: {
      storySort: { order: ['Giới thiệu', 'Foundations', 'Components', 'Patterns'] },
    },
  },
};
export default preview;
