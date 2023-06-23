import { makeMatrixFromItems } from './matrix.js';
import { findFreeSpaceForItem, normalize, adjust } from './item.js';
import { getRowsCount } from './other.js';
import type { Widget } from '$lib/components/widgets/widgets.js';

function makeItem(item: any) {
	const { min = { w: 1, h: 1 }, max } = item;
	return {
		fixed: false,
		resizable: !item.fixed,
		draggable: !item.fixed,
		customDragger: false,
		customResizer: false,
		min: {
			w: Math.max(1, min.w),
			h: Math.max(1, min.h)
		},
		max: { ...max },
		...item
	};
}

const gridHelp = {
	normalize(items: Widget[], col: any) {
		const rows = getRowsCount(items, col);
		return normalize(items, col);
	},

	adjust(items: Widget[], col: any): Widget[] {
		return adjust(items, col);
	},

	item(obj: any) {
		return makeItem(obj);
	},

	findSpace(item: Widget, items: Widget[], cols: any) {
		const matrix = makeMatrixFromItems(items, getRowsCount(items, cols), cols);

		const position = findFreeSpaceForItem(matrix, item[16]);
		return position;
	}
};

export default gridHelp;
