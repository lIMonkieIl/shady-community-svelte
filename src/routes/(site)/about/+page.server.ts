import type { Session } from '$lib/types/authjs-svelte';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event) => {
	const session = (await event.locals.getSession()) as unknown as Session | null;

	return {
		session
	};
};
