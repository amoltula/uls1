/**
 * Common Data Hooks and Utilities
 * React hooks for loading external data
 */

import { useMemo } from 'react';
import {
  getProfiles,
  getDashboardMetrics,
  getTableColumns,
  getNavigation,
  getStatusBadge,
  getButtons,
  getMessages,
  getLabels,
} from './dataLoader';

/**
 * Hook to load profile data
 */
export const useProfiles = () => {
  return useMemo(() => getProfiles(), []);
};

/**
 * Hook to load dashboard metrics
 */
export const useDashboardMetrics = () => {
  return useMemo(() => getDashboardMetrics(), []);
};

/**
 * Hook to load table columns
 */
export const useTableColumns = (type: string = 'standard') => {
  return useMemo(() => getTableColumns(type), [type]);
};

/**
 * Hook to load navigation menu
 */
export const useNavigation = () => {
  return useMemo(() => getNavigation(), []);
};

/**
 * Hook to get status badge configuration
 */
export const useStatusBadge = (status: string) => {
  return useMemo(() => getStatusBadge(status), [status]);
};

/**
 * Hook to load UI constants
 */
export const useUIConstants = () => {
  return useMemo(() => ({
    buttons: getButtons(),
    messages: getMessages(),
    labels: getLabels(),
  }), []);
};

/**
 * Hook to load asset path
 */
export const useAssetPath = (category: string, filename: string) => {
  return useMemo(() => {
    try {
      return require(`../assets/utils/images/${category}/${filename}`);
    } catch (error) {
      console.warn(`Asset not found: ${category}/${filename}`);
      return '';
    }
  }, [category, filename]);
};

/**
 * Hook to get multiple assets
 */
export const useAssets = (assets: Array<{ category: string; filename: string }>) => {
  return useMemo(() => {
    return assets.map(({ category, filename }) => {
      try {
        return {
          path: `${category}/${filename}`,
          src: require(`../assets/utils/images/${category}/${filename}`),
        };
      } catch (error) {
        console.warn(`Asset not found: ${category}/${filename}`);
        return { path: `${category}/${filename}`, src: '' };
      }
    });
  }, [assets]);
};

/**
 * Format currency helper
 */
export const formatCurrency = (
  value: number,
  options?: {
    prefix?: string;
    suffix?: string;
    decimals?: number;
    thousandSeparator?: string;
  }
) => {
  const {
    prefix = '$',
    suffix = '',
    decimals = 0,
    thousandSeparator = ',',
  } = options || {};

  const formatted = value
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

  return `${prefix}${formatted}${suffix}`;
};

/**
 * Get trend class helper
 */
export const getTrendClass = (trend: string) => {
  switch (trend) {
    case 'up':
      return 'text-success';
    case 'down':
      return 'text-danger';
    default:
      return 'text-muted';
  }
};

/**
 * Build class name helper
 */
export const buildClassName = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default {
  useProfiles,
  useDashboardMetrics,
  useTableColumns,
  useNavigation,
  useStatusBadge,
  useUIConstants,
  useAssetPath,
  useAssets,
  formatCurrency,
  getTrendClass,
  buildClassName,
};
