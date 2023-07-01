import { customThemeExists, isSkeletonTheme } from '$lib/helpers/functions';
import type { CustomTheme, SkeletonThemes } from '$lib/types/types';
import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	return {
		session
	};
};
export const actions: Actions = {
	// This action is called when the user clicks the theme button
	setTheme: async ({ cookies, request }) => {
		const formData = await request.formData();
		const theme = formData.get('theme')?.toString() ?? 'skeleton';
		if (
			isSkeletonTheme(theme as SkeletonThemes['type']) ||
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
