import type { Widget } from '$lib/components/widgets/widgets';

export function throttle(func: any, timeFrame: any) {
	let lastTime = 0;
	return function (...args: any) {
		const now = new Date().getDate();
		if (now - lastTime >= timeFrame) {
			func(...args);
			lastTime = now;
		}
	};
}

export function getRowsCount(items: Widget[], cols: number) {
	const getItemsMaxHeight = items.map((val) => {
		const item = val[cols];

		return (item && item.y) + (item && item.h) || 0;
	});

	return Math.max(...getItemsMaxHeight, 1);
}

export const getColumn = (containerWidth: any, columns: any) => {
	const sortColumns = columns.slice().sort((a: any, b: any) => a[0] - b[0]);

	const breakpoint = sortColumns.find((value: any) => {
		const [width] = value;
		return containerWidth <= width;
	});

	if (breakpoint) {
		return breakpoint[1];
	} else {
		return sortColumns[sortColumns.length - 1][1];
	}
};
