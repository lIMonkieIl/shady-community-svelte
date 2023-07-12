// Import necessary modules and functions
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

// Define the configuration object
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	// Specify the preprocess function to use with Vite
	preprocess: vitePreprocess(),

	// Vite plugin configuration
	vitePlugin: {
		inspector: true
	},
	// SvelteKit configuration
	kit: {
		// Use the 'adapter-auto' adapter for deployment
		// This adapter automatically selects an appropriate adapter based on the environment
		// Consult the SvelteKit documentation for supported environments and adapter options
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

// Export the configuration object as the default export
export default config;
