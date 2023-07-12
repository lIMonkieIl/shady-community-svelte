import { customThemeExists, isSkeletonTheme, validateToken } from '$lib/helpers/functions';
import type { CustomTheme, SkeletonThemes } from '$lib/types/types';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ url }) => {
	return { url: url.origin };
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
	},
	captcha: async ({ request }) => {
		const data = await request.formData();

		const token = data.get('cf-turnstile-response') as string; // if you edited the formsField option change this
		const SECRET_KEY = '0x4AAAAAAAHQRV4rt6EK2w7zO4Ykzc7V3_0'; // you should use $env module for secrets
		const { success, error } = await validateToken(token, SECRET_KEY);

		if (!success)
			return {
				success: false,
				error: error || 'Invalid CAPTCHA'
			};

		return {
			seccess: true,
			token: token
		};
	}
};
