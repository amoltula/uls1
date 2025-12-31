import { describe, it, expect } from '@jest/globals';
import reducer, {
  setEnableBackgroundImage,
  setEnableFixedHeader,
  setEnableHeaderShadow,
  setEnableSidebarShadow,
  setEnablePageTitleIcon,
  setEnablePageTitleSubheading,
  setEnablePageTabsAlt,
  setEnableFixedSidebar,
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
  setEnableFixedFooter,
  setBackgroundColor,
  setHeaderBackgroundColor,
  setColorScheme,
  setBackgroundImageOpacity,
  setBackgroundImage,
} from '../ThemeOptions';

describe('ThemeOptions Reducer', () => {
  const initialState = {
    backgroundColor: '',
    headerBackgroundColor: '',
    enableMobileMenuSmall: '',
    enableBackgroundImage: false,
    enableClosedSidebar: false,
    enableFixedHeader: true,
    enableHeaderShadow: true,
    enableSidebarShadow: true,
    enableFixedFooter: true,
    enableFixedSidebar: true,
    colorScheme: 'white',
    backgroundImage: expect.any(String),
    backgroundImageOpacity: 'opacity-06',
    enablePageTitleIcon: true,
    enablePageTitleSubheading: true,
    enablePageTabsAlt: true,
  };

  it('should return initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toMatchObject({
      backgroundColor: '',
      headerBackgroundColor: '',
      enableMobileMenuSmall: '',
      enableBackgroundImage: false,
      enableClosedSidebar: false,
      enableFixedHeader: true,
    });
  });

  describe('Action Creators', () => {
    it('setEnableBackgroundImage should create correct action', () => {
      const action = setEnableBackgroundImage(true);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_BACKGROUND_IMAGE',
        enableBackgroundImage: true,
      });
    });

    it('setEnableFixedHeader should create correct action', () => {
      const action = setEnableFixedHeader(false);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_FIXED_HEADER',
        enableFixedHeader: false,
      });
    });

    it('setEnableHeaderShadow should create correct action', () => {
      const action = setEnableHeaderShadow(true);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_HEADER_SHADOW',
        enableHeaderShadow: true,
      });
    });

    it('setEnableSidebarShadow should create correct action', () => {
      const action = setEnableSidebarShadow(false);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_SIDEBAR_SHADOW',
        enableSidebarShadow: false,
      });
    });

    it('setEnablePageTitleIcon should create correct action', () => {
      const action = setEnablePageTitleIcon(true);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_PAGETITLE_ICON',
        enablePageTitleIcon: true,
      });
    });

    it('setEnablePageTitleSubheading should create correct action', () => {
      const action = setEnablePageTitleSubheading(false);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_PAGETITLE_SUBHEADING',
        enablePageTitleSubheading: false,
      });
    });

    it('setEnablePageTabsAlt should create correct action', () => {
      const action = setEnablePageTabsAlt(true);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_PAGE_TABS_ALT',
        enablePageTabsAlt: true,
      });
    });

    it('setEnableFixedSidebar should create correct action', () => {
      const action = setEnableFixedSidebar(false);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_FIXED_SIDEBAR',
        enableFixedSidebar: false,
      });
    });

    it('setEnableClosedSidebar should create correct action', () => {
      const action = setEnableClosedSidebar(true);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_CLOSED_SIDEBAR',
        enableClosedSidebar: true,
      });
    });

    it('setEnableMobileMenu should create correct action', () => {
      const action = setEnableMobileMenu(false);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_MOBILE_MENU',
        enableMobileMenu: false,
      });
    });

    it('setEnableMobileMenuSmall should create correct action', () => {
      const action = setEnableMobileMenuSmall('small');
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_MOBILE_MENU_SMALL',
        enableMobileMenuSmall: 'small',
      });
    });

    it('setEnableFixedFooter should create correct action', () => {
      const action = setEnableFixedFooter(true);
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_ENABLE_FIXED_FOOTER',
        enableFixedFooter: true,
      });
    });

    it('setBackgroundColor should create correct action', () => {
      const action = setBackgroundColor('#ffffff');
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_BACKGROUND_COLOR',
        backgroundColor: '#ffffff',
      });
    });

    it('setHeaderBackgroundColor should create correct action', () => {
      const action = setHeaderBackgroundColor('#000000');
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_HEADER_BACKGROUND_COLOR',
        headerBackgroundColor: '#000000',
      });
    });

    it('setColorScheme should create correct action', () => {
      const action = setColorScheme('dark');
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_COLOR_SCHEME',
        colorScheme: 'dark',
      });
    });

    it('setBackgroundImageOpacity should create correct action', () => {
      const action = setBackgroundImageOpacity('opacity-03');
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_BACKGROUND_IMAGE_OPACITY',
        backgroundImageOpacity: 'opacity-03',
      });
    });

    it('setBackgroundImage should create correct action', () => {
      const action = setBackgroundImage('image.jpg');
      expect(action).toEqual({
        type: 'THEME_OPTIONS/SET_BACKGROUND_IMAGE',
        backgroundImage: 'image.jpg',
      });
    });
  });

  describe('Reducer Actions', () => {
    it('should handle SET_ENABLE_BACKGROUND_IMAGE', () => {
      const state = reducer(undefined, setEnableBackgroundImage(true));
      expect(state.enableBackgroundImage).toBe(true);
    });

    it('should handle SET_ENABLE_FIXED_HEADER', () => {
      const state = reducer(undefined, setEnableFixedHeader(false));
      expect(state.enableFixedHeader).toBe(false);
    });

    it('should handle SET_ENABLE_HEADER_SHADOW', () => {
      const state = reducer(undefined, setEnableHeaderShadow(false));
      expect(state.enableHeaderShadow).toBe(false);
    });

    it('should handle SET_ENABLE_SIDEBAR_SHADOW', () => {
      const state = reducer(undefined, setEnableSidebarShadow(false));
      expect(state.enableSidebarShadow).toBe(false);
    });

    it('should handle SET_ENABLE_PAGETITLE_ICON', () => {
      const state = reducer(undefined, setEnablePageTitleIcon(false));
      expect(state.enablePageTitleIcon).toBe(false);
    });

    it('should handle SET_ENABLE_PAGETITLE_SUBHEADING', () => {
      const state = reducer(undefined, setEnablePageTitleSubheading(false));
      expect(state.enablePageTitleSubheading).toBe(false);
    });

    it('should handle SET_ENABLE_PAGE_TABS_ALT', () => {
      const state = reducer(undefined, setEnablePageTabsAlt(false));
      expect(state.enablePageTabsAlt).toBe(false);
    });

    it('should handle SET_ENABLE_FIXED_SIDEBAR', () => {
      const state = reducer(undefined, setEnableFixedSidebar(false));
      expect(state.enableFixedSidebar).toBe(false);
    });

    it('should handle SET_ENABLE_CLOSED_SIDEBAR', () => {
      const state = reducer(undefined, setEnableClosedSidebar(true));
      expect(state.enableClosedSidebar).toBe(true);
    });

    it('should handle SET_ENABLE_MOBILE_MENU', () => {
      const state = reducer(undefined, setEnableMobileMenu(true));
      expect(state.enableMobileMenu).toBe(true);
    });

    it('should handle SET_ENABLE_MOBILE_MENU_SMALL', () => {
      const state = reducer(undefined, setEnableMobileMenuSmall('small'));
      expect(state.enableMobileMenuSmall).toBe('small');
    });

    it('should handle SET_ENABLE_FIXED_FOOTER', () => {
      const state = reducer(undefined, setEnableFixedFooter(false));
      expect(state.enableFixedFooter).toBe(false);
    });

    it('should handle SET_BACKGROUND_COLOR', () => {
      const state = reducer(undefined, setBackgroundColor('#ffffff'));
      expect(state.backgroundColor).toBe('#ffffff');
    });

    it('should handle SET_HEADER_BACKGROUND_COLOR', () => {
      const state = reducer(undefined, setHeaderBackgroundColor('#000000'));
      expect(state.headerBackgroundColor).toBe('#000000');
    });

    it('should handle SET_COLOR_SCHEME', () => {
      const state = reducer(undefined, setColorScheme('dark'));
      expect(state.colorScheme).toBe('dark');
    });

    it('should handle SET_BACKGROUND_IMAGE_OPACITY', () => {
      const state = reducer(undefined, setBackgroundImageOpacity('opacity-03'));
      expect(state.backgroundImageOpacity).toBe('opacity-03');
    });

    it('should handle SET_BACKGROUND_IMAGE', () => {
      const state = reducer(undefined, setBackgroundImage('new-image.jpg'));
      expect(state.backgroundImage).toBe('new-image.jpg');
    });

    it('should handle unknown action type', () => {
      const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
      expect(state).toMatchObject({
        backgroundColor: '',
        headerBackgroundColor: '',
        enableBackgroundImage: false,
      });
    });
  });
});
