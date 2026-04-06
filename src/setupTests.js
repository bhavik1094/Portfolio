import React from 'react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('lottie-react', () => ({
  default: () =>
    React.createElement('div', {
      'data-testid': 'lottie-animation',
    }),
}));
