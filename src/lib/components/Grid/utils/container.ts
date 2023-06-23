import type { Widget } from '$lib/components/widgets/widgets.js';
import { getRowsCount } from './other.js';

export function getContainerHeight(items: Widget[], yPerPx: any, cols: any) {
	return getRowsCount(items, cols) * yPerPx;
}
