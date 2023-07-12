import { VERCEL_ENV } from '$env/static/private';
import { customThemeExists, isSkeletonTheme } from '$lib/helpers/functions';
import type { CustomTheme, SkeletonThemes } from '$lib/types/types';
export async function load({ fetch, cookies, locals: { getSession } }) {
	let theme = cookies.get('theme') ?? 'skeleton';
	const skeletonThemeModules = import.meta.glob(
		`/node_modules/@skeletonlabs/skeleton/dist/themes/*.css`,
		{ as: 'raw' }
	);
	let currentTheme;

	if (!isSkeletonTheme(theme as SkeletonThemes['type'])) {
		const customThemeModules = import.meta.glob(`/src/lib/themes/*.css`, { as: 'raw' });
		const customThemeModule = customThemeModules[`/src/lib/themes/theme-${theme}.css`];

		if (customThemeExists(theme as CustomTheme['type'])) {
			currentTheme = customThemeModule();
		} else {
			// No custom theme found, so resetting to default
			cookies.set('theme', 'skeleton', { path: '/' });
			theme = 'skeleton';
		}
	}

	// Find the skeleton theme
	const skeletonThemeModule =
		skeletonThemeModules[`/node_modules/@skeletonlabs/skeleton/dist/themes/theme-${theme}.css`];
	currentTheme = currentTheme || skeletonThemeModule();

	return {
		session: await getSession(),
		currentTheme,
		vercelEnv: VERCEL_ENV
	};
}
