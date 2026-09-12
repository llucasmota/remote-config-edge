import { describe, it, expect } from 'vitest';
import { VERSION } from './index.js';

describe('Remote Config Edge Entrypoint', () => {
  it('should export the initial version 0.1.0', () => {
    expect(VERSION).toBe('0.1.0');
  });
});
