import type { customThemes, skeletonThemes } from './stores/stores';

export type CustomTheme = (typeof customThemes)[number];
export type SkeletonThemes = (typeof skeletonThemes)[number];
