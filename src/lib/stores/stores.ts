import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
export type themeTypes =
	| 'skeleton'
	| 'modern'
	| 'rocket'
	| 'seafoam'
	| 'vintage'
	| 'sahara'
	| 'hamlindigo'
	| 'gold-nouveau'
	| 'crimson';
export const storeTheme: Writable<themeTypes> = localStorageStore('storeTheme', 'skeleton');
