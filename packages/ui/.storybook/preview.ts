import type { Preview } from '@storybook/react';
import { type ScreenshotOptions, withScreenshot } from 'storycap';

export const decorators = [withScreenshot];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    screenshot: {
      // Put global screenshot parameters(e.g. viewport)
    } satisfies ScreenshotOptions,
  },
};

export default preview;
