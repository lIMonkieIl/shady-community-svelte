import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { CustomTheme, SkeletonThemes } from '$lib/types/types';

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
	{ type: 'euphoria', name: 'euphoria', icon: '✨' },
	{ type: 'essence', name: 'essence', icon: '🎉' },
	{ type: 'refined_times', name: 'refined times', icon: '🕰️' },
	{ type: 'rustic_romance', name: 'rustic romance', icon: '🕯️' },
	{ type: 'techscape', name: 'techscape', icon: '💻' },
	{ type: 'serene_seas', name: 'serene seas', icon: '🌊' },
	{ type: 'raspberry_crush', name: 'raspberry crush', icon: '🍓' },
	{ type: 'dark_mint', name: 'dark mint', icon: '🌿' },
	{ type: 'radiant_orchid', name: 'radiant orchid', icon: '🌸' },
	{ type: 'enchanted_rose', name: 'enchanted rose', icon: '🌹' },
	{ type: 'citrus_burst', name: 'citrus burst', icon: '🍋' }
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
