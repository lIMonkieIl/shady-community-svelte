import { skeletonThemes } from '$lib/stores/stores';
import type { CustomTheme, SkeletonThemes } from '$lib/types';

/**
 * A function to check if the selected custom theme exists
 * @param {CustomTheme} themeModule - The custom theme module to check
 * @returns {boolean} True = is custom theme, False = is not a custom theme
 */
export function customThemeExists(themeModule: CustomTheme['type']): boolean {
	// Retrieve all custom theme modules
	const customThemeModules = import.meta.glob('/src/lib/themes/*.css', { as: 'raw' });

	// Find the custom theme
	const customThemeModule = customThemeModules[`/src/lib/themes/theme-${themeModule}.css`];

	return typeof customThemeModule === 'function';
}

/**
 * A function to check if the selected theme is a default theme
 * @param {SkeletonThemes} name - The name of the theme
 * @returns {boolean} True = default theme, False = custom theme
 */
export function isDefaultTheme(name: SkeletonThemes['type']): boolean {
	const found = skeletonThemes.find((theme) => theme.type === name);
	return found ? true : false;
}
