import type { LayoutServerLoad } from './$types';
import { VERCEL_ENV } from '$env/static/private';
import { customThemeExists, isDefaultTheme } from '$lib/helpers/functions';
import type { CustomTheme, SkeletonThemes } from '$lib/types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	// Get the cookie from the browser called "theme"
	let theme = cookies.get('theme') ?? 'skeleton';
	// Retrieve all default theme modules
	const defaultThemeModules = import.meta.glob(
		`/node_modules/@skeletonlabs/skeleton/dist/themes/*.css`,
		{ as: 'raw' }
	);
	if (!isDefaultTheme(theme as SkeletonThemes['type'])) {
		// Retrieve all custom theme modules
		const customThemeModules = import.meta.glob(`/src/lib/themes/*.css`, { as: 'raw' });
		// Find the custom theme
		const customThemeModule = customThemeModules[`/src/lib/themes/theme-${theme}.css`];

		if (customThemeExists(theme as CustomTheme['type'])) {
			// Returning custom theme
			return {
				currentTheme: customThemeModule(),
				vercelEnv: VERCEL_ENV
			};
		}

		// No custom theme found, so resetting to default and returning
		cookies.set('theme', 'skeleton', { path: '/' });
		theme = 'skeleton';
		// Find the default theme
		const defaultThemeModule =
			defaultThemeModules[`/node_modules/@skeletonlabs/skeleton/dist/themes/theme-${theme}.css`];

		return {
			currentTheme: defaultThemeModule(),
			vercelEnv: VERCEL_ENV
		};
	}

	// Find the default theme
	const defaultThemeModule =
		defaultThemeModules[`/node_modules/@skeletonlabs/skeleton/dist/themes/theme-${theme}.css`];

	return {
		currentTheme: defaultThemeModule(),
		vercelEnv: VERCEL_ENV
	};
};
