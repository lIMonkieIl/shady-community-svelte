import type { Widget } from '$lib/components/widgets/widgets';
import { localStorageStore } from '@skeletonlabs/skeleton';
import gridHelp from '../components/Grid/utils/helper';
function createWidgetStore() {
	const { set, subscribe, update } = localStorageStore<Widget[]>('mixBoard', []);
	const actions = {
		addToWidgets: (widget: Widget) =>
			update((value) => {
				const found = value.some((el) => el.id === widget.id);
				if (found) {
					return value;
				} else {
					return [...value, widget];
				}
			}),
		removeFromWidgets: (widget: Widget) =>
			update((value) => {
				const find = value.indexOf(widget);
				const toKeep = value;
				toKeep.splice(find, 1);
				return toKeep;
			}),
		collapsWidgetToggle: (widget: Widget) =>
			update((value) => {
				const edited = value.map((w) => {
					if (w.id === widget.id) {
						if (w.collapsed.active) {
							w.collapsed.active = false;
							w[16].h = w.collapsed.h;
							w[16].w = w.collapsed.w;
							w.collapsed.h = 1;
							// found.collapsed.w = 4;
						} else {
							w.collapsed.active = true;
							w.collapsed.h = w[16].h;
							w.collapsed.w = w[16].w;
							w[16].h = 1;
							// found[16].w = 4;
						}
					}
					return w;
				});
				return gridHelp.adjust(edited, 16);
			}),
		lockWidgetToggle: (widget: Widget) =>
			update((value) => {
				const edited = value.map((w) => {
					if (w.id === widget.id) {
						if (w[16].fixed) {
							w[16].fixed = false;
							w[16].draggable = true;
							w[16].customDragger = true;
							w[16].customResizer = true;
							w[16].resizable = true;
						} else {
							w[16].fixed = true;
							w[16].draggable = false;
							w[16].customDragger = false;
							w[16].customResizer = false;
							w[16].resizable = false;
						}
					}
					return w;
				});
				return edited;
			})
	};
	return {
		actions,
		set,
		subscribe,
		update
	};
}

export const storeWidget = createWidgetStore();
