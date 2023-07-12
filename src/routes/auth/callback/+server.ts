// Import the 'redirect' function from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit';

// This file handles the HTTP GET request for a specific route.
// It is responsible for exchanging the received 'code' parameter for a session
// and redirecting the user to the home page afterward.

// Define the 'GET' function
export const GET = async ({ url, locals: { supabase } }) => {
	// Retrieve the 'code' parameter from the URL's search params
	const code = url.searchParams.get('code');

	// Check if the 'code' parameter exists
	if (code) {
		// If the 'code' parameter exists, exchange it for a session using Supabase's 'exchangeCodeForSession' method
		await supabase.auth.exchangeCodeForSession(code);
	}

	// Throw a redirect to the home page with a status code of 303
	throw redirect(303, '/');
};
