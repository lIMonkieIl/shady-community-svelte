import { customThemeExists, isDefaultTheme } from '$lib/helpers/functions';
import type { CustomTheme, SkeletonThemes } from '$lib/types';
import type { Actions } from './$types';

export const actions: Actions = {
	// This action is called when the user clicks the theme button
	setTheme: async ({ cookies, request }) => {
		const formData = await request.formData();
		const theme = formData.get('theme')?.toString() ?? 'skeleton';
		if (
			isDefaultTheme(theme as SkeletonThemes['type']) ||
			customThemeExists(theme as CustomTheme['type'])
		) {
			// Sets the selected theme to the cookie
			cookies.set('theme', theme, { path: '/' });
			return { theme };
		} else {
			// Sets the default theme to the cookie
			cookies.set('theme', 'skeleton', { path: '/' });
			return { theme: 'skeleton' };
		}
	}
};
