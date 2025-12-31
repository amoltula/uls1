import { describe, it, expect } from '@jest/globals';
import configureAppStore from '../configureStore';

describe('configureAppStore', () => {
  it('should create a store with reducers', () => {
    const store = configureAppStore();
    expect(store).toBeDefined();
    expect(store.getState()).toBeDefined();
  });

  it('should have ThemeOptions in state', () => {
    const store = configureAppStore();
    const state = store.getState();
    expect(state).toHaveProperty('ThemeOptions');
  });

  it('should have initial ThemeOptions state', () => {
    const store = configureAppStore();
    const state = store.getState();
    expect(state.ThemeOptions).toMatchObject({
      backgroundColor: '',
      headerBackgroundColor: '',
      enableBackgroundImage: false,
      enableClosedSidebar: false,
      enableFixedHeader: true,
    });
  });

  it('should allow dispatching actions', () => {
    const store = configureAppStore();
    const action = {
      type: 'THEME_OPTIONS/SET_ENABLE_BACKGROUND_IMAGE',
      enableBackgroundImage: true,
    };
    store.dispatch(action);
    const state = store.getState();
    expect(state.ThemeOptions.enableBackgroundImage).toBe(true);
  });

  it('should have middleware configured', () => {
    const store = configureAppStore();
    expect(store.dispatch).toBeDefined();
  });

  it('should preserve state after multiple dispatches', () => {
    const store = configureAppStore();
    
    store.dispatch({
      type: 'THEME_OPTIONS/SET_ENABLE_FIXED_HEADER',
      enableFixedHeader: false,
    });
    
    store.dispatch({
      type: 'THEME_OPTIONS/SET_BACKGROUND_COLOR',
      backgroundColor: '#ffffff',
    });

    const state = store.getState();
    expect(state.ThemeOptions.enableFixedHeader).toBe(false);
    expect(state.ThemeOptions.backgroundColor).toBe('#ffffff');
  });
});
