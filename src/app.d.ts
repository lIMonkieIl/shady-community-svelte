// Import the SupabaseClient class from the '@supabase/supabase-js' package
import { SupabaseClient } from '@supabase/supabase-js';

// Import the Database type from '$lib/types/supabase.types' generated from running (npm supabase-gen-types)
import { Database } from '$lib/types/supabase.types';

// Import the Session type from '$lib/types/types'
import type { Session } from '$lib/types/types';

// Declare a global namespace for the application
declare global {
	namespace App {
		// Define the 'Locals' interface within the 'App' namespace
		interface Locals {
			supabase: SupabaseClient<Database>; // A Supabase client instance with a specific database type
			getSession(): Promise<Session | null>; // A function that returns a Promise of a Session object or null
		}

		// Define the 'PageData' interface within the 'App' namespace
		interface PageData {
			session: Session | null; // Represents the session data available for a specific page
		}

		// Uncomment the following interfaces if needed
		// interface Error {} // Additional error interface, if required
		// interface Platform {} // Additional platform interface, if required
	}
}
