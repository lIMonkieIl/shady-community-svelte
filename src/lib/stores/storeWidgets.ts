import type { Widget } from '$lib/components/widgets';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const storeWidgets: Writable<Widget[]> = localStorageStore('widgets', []);
