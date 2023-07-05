import type { PageServerLoad } from './$types';
import IngredientsData from '$lib/data/Ingredients.json';
import DrugsData from '$lib/data/Drugs.json';
import {
	calMixStrengthMulti,
	calMixValue,
	retrieveType,
	type Ingredient,
	type MadeWith,
	retrieveAverageSellPrice,
	calMixDemand,
	retrieveKnownAs,
	retrieveIswet,
	retrieveImage,
	calMixVolume,
	calMixCost
} from '$lib/helpers/mix';
import prisma from '$lib/db/prisma';
import type { Session } from '$lib/types/authjs-svelte';
import type { Mix } from '$lib/stores/storeMix';
export const load: PageServerLoad = async (event) => {
	const session = (await event.locals.getSession()) as unknown as Session | null;
	const baseIngredients: Ingredient[] = [...IngredientsData, ...DrugsData];
	const userAndPublicMixes = await prisma.mix.findMany({
		where: { OR: [{ isPublic: true }, { cook: { discordId: session?.user.discordId } }] },
		include: {
			madeWith: true,
			cook: true
		}
	});
	const extendedUserAndPublicMixes: Ingredient[] = userAndPublicMixes.map((mix) => {
		const extendedMadeWith: MadeWith[] = [];
		mix.madeWith.forEach((madewith) => {
			const extended = baseIngredients.find((ingr) => ingr.id === madewith.ingredientId);
			if (extended) {
				extendedMadeWith.push({
					...extended,
					amount: madewith.amount,
					purchaseOption: madewith.purchase
				});
			}
		});

		const ingr: Ingredient = {
			...mix,
			image: retrieveImage(mix as unknown as Mix, baseIngredients),
			isWet: retrieveIswet(mix as unknown as Mix, baseIngredients),
			mixStrength: calMixStrengthMulti(mix as unknown as Mix, baseIngredients),
			strength: calMixValue('strength', mix as unknown as Mix, baseIngredients),
			toxicity: calMixValue('toxicity', mix as unknown as Mix, baseIngredients),
			addiction: calMixValue('addiction', mix as unknown as Mix, baseIngredients),
			type: retrieveType(mix as unknown as Mix, baseIngredients),
			averageSellPrice: retrieveAverageSellPrice(mix as unknown as Mix, baseIngredients),
			demandedIn: calMixDemand(mix as unknown as Mix, baseIngredients),
			knownAs: retrieveKnownAs(mix as unknown as Mix, baseIngredients),
			madeWith: extendedMadeWith,
			cook: mix.cook,
			purchase: [
				{
					location: 'made',
					costs:
						calMixVolume(mix as unknown as Mix, baseIngredients) /
						calMixCost(mix as unknown as Mix, baseIngredients)
				}
			]
		};
		return ingr;
	});
	return {
		session,
		ingredients: [...baseIngredients, ...extendedUserAndPublicMixes]
	};
};
