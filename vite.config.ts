// Import necessary modules and functions
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Define the Vite configuration using 'defineConfig'
export default defineConfig({
	// Specify plugins to use, in this case, 'sveltekit'
	plugins: [sveltekit()]
});
