module.exports = {
	// Specify the root directory for ESLint
	root: true,

	// Specify the ESLint configurations to extend
	extends: [
		'eslint:recommended', // Use the recommended ESLint rules
		'plugin:@typescript-eslint/recommended', // Use the recommended rules for TypeScript
		'plugin:svelte/recommended', // Use the recommended rules for Svelte
		'prettier' // Use Prettier to enforce consistent code formatting
	],

	// Specify the parser for TypeScript
	parser: '@typescript-eslint/parser',

	// Specify additional ESLint plugins
	plugins: ['@typescript-eslint'],

	// Specify the parser options
	parserOptions: {
		sourceType: 'module', // Specify the source type as 'module'
		ecmaVersion: 2020, // Specify the ECMAScript version to support
		extraFileExtensions: ['.svelte'] // Specify additional file extensions to be parsed as TypeScript
	},

	// Specify the environment settings
	env: {
		browser: true, // Set the environment to browser
		es2017: true, // Set the environment to ECMAScript 2017
		node: true // Set the environment to Node.js
	},

	// Specify overrides for specific files or file patterns
	overrides: [
		{
			files: ['*.svelte'], // Apply the following configurations to Svelte files
			parser: 'svelte-eslint-parser', // Use the Svelte parser for linting Svelte code
			parserOptions: {
				parser: '@typescript-eslint/parser' // Use the TypeScript parser for Svelte files
			}
		}
	]
};
