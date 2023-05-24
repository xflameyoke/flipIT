import { afterEach, vi, afterAll, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import { handlers } from 'mocks';

expect.extend(matchers);
const server = setupServer(...handlers);
const { getComputedStyle } = window;

beforeAll(() => {
  server.listen();
  window.getComputedStyle = (elt) => getComputedStyle(elt);
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(() => ({
    addListener: vi.fn(),
    removeListener: vi.fn()
  }))
});
