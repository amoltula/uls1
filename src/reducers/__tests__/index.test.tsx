import { describe, it, expect } from '@jest/globals';
import reducer from '../index';

describe('Root Reducer', () => {
  it('should export reducer object', () => {
    expect(reducer).toBeDefined();
    expect(typeof reducer).toBe('object');
  });

  it('should have ThemeOptions reducer', () => {
    expect(reducer).toHaveProperty('ThemeOptions');
    expect(typeof reducer.ThemeOptions).toBe('function');
  });

  it('should return initial state from ThemeOptions', () => {
    const state = reducer.ThemeOptions(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state).toHaveProperty('backgroundColor');
    expect(state).toHaveProperty('enableFixedHeader');
  });
});
