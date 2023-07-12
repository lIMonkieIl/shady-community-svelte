// Import environment variables for Supabase URL and key
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

// Import Supabase load client helper
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

// Import database and session types
import type { Database } from '$lib/types/supabase.types.js';
import type { Session } from '$lib/types/types.js';

// Define the 'load' function
export const load = async ({ url, fetch, data, depends }) => {
	// Specify the dependency on 'supabase:auth'
	depends('supabase:auth');

	// Create a Supabase load client using the provided Supabase URL, key, and other options
	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		// Passing the serverSession from './+layout.server.ts'
		serverSession: data.session
	});

	// Get the user session using the Supabase load client
	const {
		data: { session }
	} = await supabase.auth.getSession();
	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session?.user.id)
		.single();
	// Return the Supabase load client, session, and the origin of the URL
	return {
		supabase,
		currentTheme: data.currentTheme,
		session: session as unknown as Session,
		profile
	};
};
