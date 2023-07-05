// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session } from '$lib/types/authjs-svelte';

// and what to do when importing types
declare global {
	namespace App {
		// interface Locals {}
		interface PageData {
			session: Session;
		}
		// interface Error {}
		// interface Platform {}
	}
}
