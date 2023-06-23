import type { Widget } from '$lib/components/widgets/widgets.js';
import {
	makeMatrix,
	makeMatrixFromItemsIgnore,
	findCloseBlocks,
	findItemsById,
	makeMatrixFromItems
} from './matrix.js';
import { getRowsCount } from './other.js';

export function getItemById(id: number, items: Widget[]) {
	return items.find((value) => value.id === id);
}

export function findFreeSpaceForItem(matrix: any, item: Widget[16]) {
	const cols = matrix[0].length;
	const w = Math.min(cols, item.w);
	const xNtime = cols - w;
	const getMatrixRows = matrix.length;

	for (let i = 0; i < getMatrixRows; i++) {
		const row = matrix[i];
		for (let j = 0; j < xNtime + 1; j++) {
			const sliceA = row.slice(j, j + w);
			const empty = sliceA.every((val: any) => val === undefined);
			if (empty) {
				const isEmpty = matrix
					.slice(i, i + item.h)
					.every((a: any) => a.slice(j, j + w).every((n: any) => n === undefined));

				if (isEmpty) {
					return { y: i, x: j };
				}
			}
		}
	}

	return {
		y: getMatrixRows,
		x: 0
	};
}

const getItem = (item: Widget, col: any) => {
	return { ...item[col], id: item.id };
};

const updateItem = (elements: any, active: any, position: any, col: any) => {
	return elements.map((value: any) => {
		if (value.id === active.id) {
			return { ...value, [col]: { ...value[col], ...position } };
		}
		return value;
	});
};

export function moveItemsAroundItem(active: any, items: Widget[], cols: any, original: any) {
	// Get current item from the breakpoint
	const activeItem = getItem(active, cols);
	const ids = items.map((value) => value.id).filter((value) => value !== activeItem.id);

	const els = items.filter((value) => value.id !== activeItem.id);

	// Update items
	const newItems = updateItem(items, active, activeItem, cols);

	let matrix = makeMatrixFromItemsIgnore(newItems, ids, getRowsCount(newItems, cols), cols);
	let tempItems = newItems;

	// Exclude resolved elements ids in array
	const exclude: any = [];

	els.forEach((item) => {
		// Find position for element
		const position = findFreeSpaceForItem(matrix, item[16]);
		// Exclude item
		exclude.push(item.id);

		tempItems = updateItem(tempItems, item, position, cols);

		// Recreate ids of elements
		const getIgnoreItems = ids.filter((value) => exclude.indexOf(value) === -1);

		// Update matrix for next iteration
		matrix = makeMatrixFromItemsIgnore(
			tempItems,
			getIgnoreItems,
			getRowsCount(tempItems, cols),
			cols
		);
	});

	// Return result
	return tempItems;
}

export function moveItem(active: any, items: Widget[], cols: any, original: any) {
	// Get current item from the breakpoint
	const item = getItem(active, cols);

	// Create matrix from the items expect the active
	let matrix = makeMatrixFromItemsIgnore(items, [item.id], getRowsCount(items, cols), cols);
	// Getting the ids of items under active Array<String>
	const closeBlocks = findCloseBlocks(items, matrix, item);
	// Getting the objects of items under active Array<Object>
	const closeObj = findItemsById(closeBlocks, items);
	// Getting whenever of these items is fixed
	const fixed = closeObj.find((value: any) => value[cols].fixed);

	// If found fixed, reset the active to its original position
	if (fixed) return items;

	// Update items
	items = updateItem(items, active, item, cols);

	// Create matrix of items expect close elements
	matrix = makeMatrixFromItemsIgnore(items, closeBlocks, getRowsCount(items, cols), cols);

	// Create temp vars
	let tempItems = items;
	const tempCloseBlocks = closeBlocks;

	// Exclude resolved elements ids in array
	const exclude: any = [];

	// Iterate over close elements under active item
	closeObj.forEach((item: any) => {
		// Find position for element
		const position = findFreeSpaceForItem(matrix, item[cols]);
		// Exclude item
		exclude.push(item.id);

		// Assign the position to the element in the column
		tempItems = updateItem(tempItems, item, position, cols);

		// Recreate ids of elements
		const getIgnoreItems = tempCloseBlocks.filter((value) => exclude.indexOf(value) === -1);

		// Update matrix for next iteration
		matrix = makeMatrixFromItemsIgnore(
			tempItems,
			getIgnoreItems,
			getRowsCount(tempItems, cols),
			cols
		);
	});

	// Return result
	return tempItems;
}

// Helper function
export function normalize(items: Widget[], col: any) {
	let result = items.slice();

	result.forEach((value: any) => {
		const getItem = value[col];
		if (!getItem.static) {
			result = moveItem(getItem, result, col, { ...getItem });
		}
	});

	return result;
}

// Helper function
export function adjust(items: Widget[], col: any) {
	let matrix = makeMatrix(getRowsCount(items, col), col);

	const res: any = [];

	items.forEach((item) => {
		if (!item[16].fixed) {
			const position = findFreeSpaceForItem(matrix, item[16]);
			res.push({
				...item,
				[col]: {
					...item[col],
					...position
				}
			});
		} else {
			res.push({
				...item,
				[col]: item[col]
			});
		}

		matrix = makeMatrixFromItems(res, getRowsCount(res, col), col);
	});

	return res;
}

export function getUndefinedItems(items: Widget[], col: any, breakpoints: any) {
	return items
		.map((value) => {
			if (!value[col]) {
				return value.id;
			}
		})
		.filter(Boolean);
}

export function getClosestColumn(items: Widget[], item: Widget, col: any, breakpoints: any) {
	return breakpoints
		.map(([_, column]: any) => item[column] && column)
		.filter(Boolean)
		.reduce(function (acc: any, value: any) {
			const isLower = Math.abs(value - col) < Math.abs(acc - col);

			return isLower ? value : acc;
		});
}

export function specifyUndefinedColumns(items: Widget[], col: any, breakpoints: any) {
	let matrix = makeMatrixFromItems(items, getRowsCount(items, col), col);

	const getUndefinedElements = getUndefinedItems(items, col, breakpoints);

	let newItems = [...items];

	getUndefinedElements.forEach((elementId: any) => {
		const getElement = items.find((item: any) => item.id === elementId);
		if (!getElement) {
			return items;
		}
		const closestColumn = getClosestColumn(items, getElement, col, breakpoints);

		const position = findFreeSpaceForItem(matrix, getElement[closestColumn]);

		const newItem = {
			...getElement,
			[col]: {
				...getElement[closestColumn],
				...position
			}
		};

		newItems = newItems.map((value) => (value.id === elementId ? newItem : value));

		matrix = makeMatrixFromItems(newItems, getRowsCount(newItems, col), col);
	});
	return newItems;
}
