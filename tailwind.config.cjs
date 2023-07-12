// Import necessary modules and functions
import { join } from 'path';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';

// Define the Tailwind CSS configuration
/** @type {import('tailwindcss').Config} */
module.exports = {
	// Set the dark mode to 'class'
	darkMode: 'class',

	// Specify the content to be processed by Tailwind CSS
	content: [
		'./src/**/*.{html,js,svelte,ts}', // Files in the './src' directory with the specified extensions
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}') // Files from the '@skeletonlabs/skeleton' package with the specified extensions
	],

	// Define the theme configuration
	theme: {
		extend: {} // Extend the default theme configuration if needed
	},

	// Specify the plugins to be used by Tailwind CSS
	plugins: [forms, typography, ...skeleton()]
};
