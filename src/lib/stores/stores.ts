import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { CustomTheme, SkeletonThemes } from '$lib/types';

export const skeletonThemes = [
	{ type: 'skeleton', name: 'skeleton', icon: '💀' },
	{ type: 'modern', name: 'modern', icon: '🤖' },
	{ type: 'rocket', name: 'rocket', icon: '🚀' },
	{ type: 'seafoam', name: 'seafoam', icon: '🧜‍♀️' },
	{ type: 'vintage', name: 'vintage', icon: '📺' },
	{ type: 'sahara', name: 'sahara', icon: '🏜️' },
	{ type: 'hamlindigo', name: 'hamlindigo', icon: '👔' },
	{ type: 'gold-nouveau', name: 'gold nouveau', icon: '💫' },
	{ type: 'crimson', name: 'crimson', icon: '⭕' }
] as const;

export const customThemes = [
	{ type: 'greenie', name: 'greenie', icon: '☘️' },
	{ type: 'blueish', name: 'blueish', icon: '🔷' }
] as const;

function createStoreTheme() {
	const { set, subscribe }: Writable<SkeletonThemes['type'] | CustomTheme['type']> =
		localStorageStore('storeTheme', skeletonThemes[0].type);
	const actions = {
		setTheme: (name: SkeletonThemes['type'] | CustomTheme['type']) => set(name),
		defaultTheme: () => set(skeletonThemes[0].type)
	};
	return {
		subscribe,
		actions
	};
}

export const storeTheme = createStoreTheme();
