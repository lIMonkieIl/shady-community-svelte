import type { Widget } from '$lib/components/widgets/widgets.js';
import { getRowsCount } from './other.js';

export const makeMatrix = (rows: number, cols: number) =>
	Array.from(Array(rows), () => new Array(cols)); // make 2d array

export function makeMatrixFromItems(items: Widget[], _row: number, _col: number) {
	const matrix = makeMatrix(_row, _col);

	for (let i = 0; i < items.length; i++) {
		const value = items[i][_col];
		if (value) {
			const { x, y, h } = value;
			const id = items[i].id;
			const w = Math.min(_col, value.w);

			for (let j = y; j < y + h; j++) {
				const row = matrix[j];
				for (let k = x; k < x + w; k++) {
					row[k] = { ...value, id };
				}
			}
		}
	}
	return matrix;
}

export function findCloseBlocks(items: Widget[], matrix: any, curObject: any) {
	const { h, x, y } = curObject;

	const w = Math.min(matrix[0].length, curObject.w);
	const tempR = matrix.slice(y, y + h);

	let result: any = [];
	for (let i = 0; i < tempR.length; i++) {
		const tempA = tempR[i].slice(x, x + w);
		result = [
			...result,
			...tempA.map((val: any) => val.id && val.id !== curObject.id && val.id).filter(Boolean)
		];
	}

	return [...new Set(result)];
}

export function makeMatrixFromItemsIgnore(
	items: Widget[],
	ignoreList: any,
	_row: number,
	_col: number
) {
	const matrix = makeMatrix(_row, _col);
	for (let i = 0; i < items.length; i++) {
		const value = items[i][_col];
		const id = items[i].id;
		const { x, y, h } = value;
		const w = Math.min(_col, value.w);

		if (ignoreList.indexOf(id) === -1) {
			for (let j = y; j < y + h; j++) {
				const row = matrix[j];
				if (row) {
					for (let k = x; k < x + w; k++) {
						row[k] = { ...value, id };
					}
				}
			}
		}
	}
	return matrix;
}

export function findItemsById(closeBlocks: any, items: Widget[]) {
	return items.filter((value) => closeBlocks.indexOf(value.id) !== -1);
}
