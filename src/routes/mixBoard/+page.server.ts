import type { PageServerLoad } from './$types';
import IngredientsData from '$lib/data/Ingredients.json';
import DrugsData from '$lib/data/Drugs.json';
import type { Ingredient } from '$lib/helpers/mix';
export const load: PageServerLoad = async (event) => {
	const baseIngredients: Ingredient[] = [...IngredientsData, ...DrugsData];
	return {
		ingredients: [...baseIngredients]
	};
};
