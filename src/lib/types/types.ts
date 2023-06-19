import type { customThemes, skeletonThemes } from '../stores/storeTheme';

export type CustomTheme = (typeof customThemes)[number];
export type SkeletonThemes = (typeof skeletonThemes)[number];
