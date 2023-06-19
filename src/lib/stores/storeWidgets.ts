import type { Widget } from '$lib/components/widgets/widgets';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

type WidgetStore = {
	dragDisabled: boolean;
	widgets: Widget[];
};

function createWidgetsStore() {
	const { subscribe, update }: Writable<WidgetStore> = localStorageStore('widgets', {
		dragDisabled: true,
		widgets: []
	});
	const actions = {
		setIsDraggable: (dragDisabled: boolean) =>
			update((value) => (value = { ...value, dragDisabled })),
		addToWidgets: (widget: Widget) =>
			update((value) => (value = { ...value, widgets: [...value.widgets, widget] })),
		setWidgets: (widgets: Widget[]) => update((value) => (value = { ...value, widgets })),
		removeFromWidgets: (widget: Widget) =>
			update((value) => {
				const find = value.widgets.indexOf(widget);
				const toKeep = value.widgets;
				toKeep.splice(find, 1);
				return { dragDisabled: value.dragDisabled, widgets: toKeep };
			})
	};

	return {
		subscribe,
		actions
	};
}

export const storeWidgets = createWidgetsStore();
