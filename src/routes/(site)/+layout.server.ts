import { VERCEL_ENV } from '$env/static/private';
import { customThemeExists, isSkeletonTheme } from '$lib/helpers/functions';
import type { CustomTheme, SkeletonThemes } from '$lib/types/types';
import type { Session } from 'inspector';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async (event) => {
	// Get the cookie from the browser called "theme"
	let theme = event.cookies.get('theme') ?? 'skeleton';
	// Retrieve all skeleton theme modules
	const skeletonThemeModules = import.meta.glob(
		`/node_modules/@skeletonlabs/skeleton/dist/themes/*.css`,
		{ as: 'raw' }
	);
	if (!isSkeletonTheme(theme as SkeletonThemes['type'])) {
		// Retrieve all custom theme modules
		const customThemeModules = import.meta.glob(`/src/lib/themes/*.css`, { as: 'raw' });
		// Find the custom theme
		const customThemeModule = customThemeModules[`/src/lib/themes/theme-${theme}.css`];

		if (customThemeExists(theme as CustomTheme['type'])) {
			// Returning custom theme
			return {
				session: (await event.locals.getSession()) as unknown as Session | null,
				currentTheme: customThemeModule(),
				vercelEnv: VERCEL_ENV
			};
		}

		// No custom theme found, so resetting to default and returning
		event.cookies.set('theme', 'skeleton', { path: '/' });
		theme = 'skeleton';
		// Find the skeleton theme
		const skeletonThemeModule =
			skeletonThemeModules[`/node_modules/@skeletonlabs/skeleton/dist/themes/theme-${theme}.css`];

		return {
			session: (await event.locals.getSession()) as unknown as Session | null,
			currentTheme: skeletonThemeModule(),
			vercelEnv: VERCEL_ENV
		};
	}

	// Find the skeleton theme
	const skeletonThemeModule =
		skeletonThemeModules[`/node_modules/@skeletonlabs/skeleton/dist/themes/theme-${theme}.css`];

	return {
		session: (await event.locals.getSession()) as unknown as Session | null,
		currentTheme: skeletonThemeModule(),
		vercelEnv: VERCEL_ENV
	};
};
