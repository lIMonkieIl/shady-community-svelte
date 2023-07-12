// ./src/hooks.server.ts

/**
 * Import external dependencies
 */
import { redirect, type Handle } from '@sveltejs/kit';

/**
 * Import functions
 */
import { matchesRoute } from '$lib/helpers/functions';

/**
 * Import environment variables for Supabase URL and key
 */
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

/**
 * Import types
 */
import type { Session } from '$lib/types/types';

/**
 * Import Supabase server client helper
 */
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

/**
 * Define the server-side handle function
 */
export const handle: Handle = async ({ event, resolve }) => {
	/**
	 * Create a Supabase server client using the provided Supabase URL, key, and event
	 */
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * Define a function to get the user session
	 * ? A convenience helper so we can just call await getSession() instead of const { data: { session } } = await supabase.auth.getSession()
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		/**
		 * Extending the type from supabase.user to get type safety from user.user_metadata
		 */
		return session as unknown as Session;
	};

	if (matchesRoute(event.url.pathname, ['/profile'])) {
		/**
		 * Get the user session
		 */
		const session = await event.locals.getSession();
		if (!session) {
			/**
			 * If the user is not signed in, redirect them to the home page
			 */
			throw redirect(303, '/');
		}
	}

	/**
	 * Return the resolved event with a filter for serialized response headers
	 */
	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
