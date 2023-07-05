import type { Mix } from '$lib/stores/storeMix';
import type { User } from '$lib/types/authjs-svelte';
import { clamp } from './functions';

export interface Ingredient {
	id: string;
	name: string;
	type: string;
	image: string;
	isWet: boolean;
	category: string;
	toxicity: number;
	strength: number;
	mixStrength: number;
	addiction: number;
	averageSellPrice?: number;
	cook?: User | null;
	knownAs?: string[];
	madeWith?: MadeWith[];
	demandedIn?: DemandedIn[];
	purchase?: Purchase[];
}

export interface MadeWith extends Ingredient {
	amount: number;
	purchaseOption?: number;
}

export interface DemandedIn {
	area: string;
	demand: number;
	sector: string;
}

export interface Purchase {
	location: string;
	costs: number;
}

export function calMixPurity(action: 'purity' | 'quality', mix: Mix, ingredients: Ingredient[]) {
	if (!mix.madeWith.length)
		switch (action) {
			case 'purity':
				return 0;
			case 'quality':
				return 'unknown';
		}
	const purity = (mix.madeWith[0].amount / calMixVolume(mix, ingredients)) * 100;
	switch (action) {
		case 'purity':
			return purity;
		case 'quality':
			if (purity <= 70) return 'very low';
			else if (purity > 70 && purity <= 75) return 'low';
			else if (purity > 75 && purity <= 79) return 'good';
			else if (purity > 79 && purity <= 99) return 'excellent';
			else return 'pure';
	}
}
export function calMixAddictiveness(mix: Mix, ingredients: Ingredient[]) {
	const minClamp = 0.01;
	const maxClamp = 0.12;
	const minAddictValue = 1.0;
	const maxAddictValue = 13.0;
	const mixAddiction = calMixValue('addiction', mix, ingredients);
	const divideMinAddictValue = 2;
	const addiction = (mixAddiction - minAddictValue / divideMinAddictValue) / maxAddictValue;
	return clamp(addiction, minClamp, maxClamp) * 100;
}
export function calMixDemand(mix: Mix, ingredients: Ingredient[]) {
	if (!mix.madeWith.length) return [];
	const demand = ingredients.find((ingr) => {
		if (!mix.madeWith.length) return;
		if (ingr.id !== mix.madeWith[0].ingredientId) return;
		return ingr;
	});
	return demand?.demandedIn ?? [];
}
export function calMixOverdose(data: 'percent' | 'value', mix: Mix, ingredients: Ingredient[]) {
	const minODToxicity = 3.9;
	const lowToxODPercent = 0.0;
	const hightToxODPercent = 0.25;
	const hightToxLevel = 12.0;
	const mixToxicity = calMixValue('toxicity', mix, ingredients);
	const overdoseRisk = clamp(
		(mixToxicity - minODToxicity) / (hightToxLevel - minODToxicity),
		0.0,
		1.0
	);
	if (data == 'percent') return overdoseRisk * 10;
	if (overdoseRisk >= lowToxODPercent && overdoseRisk <= hightToxODPercent) return 'low';
	if (overdoseRisk > hightToxODPercent) return 'high';
}
export function calMixValue(
	value: 'addiction' | 'strength' | 'toxicity',
	mix: Mix,
	ingredients: Ingredient[]
) {
	let dataAmount = 0;
	mix.madeWith.forEach((madewith) => {
		ingredients.forEach((ingr) => {
			if (ingr.id !== madewith?.ingredientId) return;
			dataAmount += ((ingr?.[value] ?? 0) / (ingr?.mixStrength ?? 0)) * madewith.amount;
		});
	});
	const data =
		(calMixStrengthMulti(mix, ingredients) / calMixVolume(mix, ingredients)) * dataAmount;
	return isNaN(data) ? 0 : data;
}
export function calMixStrengthMulti(mix: Mix, ingredients: Ingredient[]) {
	let totalMixStrength = 0;
	mix.madeWith.forEach((madewith) => {
		ingredients.forEach((ingr) => {
			if (ingr.id === madewith.ingredientId) {
				totalMixStrength += (ingr?.mixStrength ?? 0) * (madewith.amount ?? 0);
			}
		});
	});
	const data = totalMixStrength / calMixVolume(mix, ingredients);
	return isNaN(data) ? 0 : data;
}
export function calMixCost(mix: Mix, ingredients: Ingredient[]) {
	let total = 0;
	mix.madeWith.forEach((madeWith) => {
		ingredients.forEach((ingr) => {
			if (ingr.id === madeWith.ingredientId) {
				let index = 0;
				if (ingr.purchase === undefined) return total;
				if (madeWith.purchase ?? 0 <= ingr.purchase.length - 1) index = madeWith.purchase ?? 0;
				total += madeWith.amount * ingr.purchase[index].costs;
			}
		});
	});
	return total;
}
export function calMixVolume(mix: Mix, ingredients: Ingredient[]) {
	let total = 0;
	mix.madeWith.forEach((madeWith) => {
		ingredients.forEach((ingr) => {
			if (ingr.id === madeWith.ingredientId) {
				total += madeWith.amount;
			}
		});
	});
	return total;
}
export function retrieveType(mix: Mix, ingredients: Ingredient[]) {
	const baseType = 'POWDER';
	if (!mix.madeWith.length) return baseType;
	return (
		ingredients.find((value) => {
			if (value.id === mix.madeWith[0].ingredientId) return value;
		})?.type ?? baseType
	);
}
export function retrieveImage(mix: Mix, ingredients: Ingredient[]) {
	const baseImage = '/images/drugs/BagPowder.webp';
	if (!mix.madeWith.length) return baseImage;
	return (
		ingredients.find((value) => {
			if (value.id === mix.madeWith[0].ingredientId) return value;
		})?.image ?? baseImage
	);
}
export function retrieveIswet(mix: Mix, ingredients: Ingredient[]) {
	if (!mix.madeWith.length) return false;
	let isWet = false;
	mix.madeWith.forEach((madeWith) => {
		ingredients.forEach((item) => {
			if (item.id === madeWith.ingredientId) {
				if (item.isWet) {
					isWet = true;
				}
			}
		});
	});
	return isWet;
}
export function retrieveKnownAs(mix: Mix, ingredients: Ingredient[]) {
	if (!mix.madeWith.length) return [];
	return (
		ingredients.find((value) => {
			if (value.id === mix.madeWith[0].ingredientId) return value;
		})?.knownAs ?? []
	);
}

export function retrieveAverageSellPrice(mix: Mix, ingredients: Ingredient[]) {
	if (!mix.madeWith.length) return 0;
	return (
		ingredients.find((value) => {
			if (value.id === mix.madeWith[0].ingredientId) return value;
		})?.averageSellPrice ?? 0
	);
}
