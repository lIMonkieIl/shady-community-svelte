import { skeletonThemes } from '$lib/stores/storeTheme';
import type { CustomTheme, SkeletonThemes } from '$lib/types/types';

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
 * A function to check if the selected theme is a skeleton theme
 * @param {SkeletonThemes} name - The name of the theme
 * @returns {boolean} True = default theme, False = custom theme
 */
export function isSkeletonTheme(name: SkeletonThemes['type']): boolean {
	const found = skeletonThemes.find((theme) => theme.type === name);
	return found ? true : false;
}

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

/**
 * Check if the requested URL matches any of the provided routes
 * @param urlPathname The pathname of the requested URL
 * @param routes An array of routes to match against
 * @returns true if the URL matches any of the routes, false otherwise
 */
export function matchesRoute(urlPathname: string, routes: string[]): boolean {
	return routes.some((route) => urlPathname.startsWith(route));
}

interface TokenValidateResponse {
	'error-codes': string[];
	success: boolean;
	action: string;
	cdata: string;
}

export async function validateToken(token: string, secret: string) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			response: token,
			secret: secret
		})
	});

	const data: TokenValidateResponse = await response.json();

	return {
		// Return the status
		success: data.success,

		// Return the first error if it exists
		error: data['error-codes']?.length ? data['error-codes'][0] : null
	};
}
