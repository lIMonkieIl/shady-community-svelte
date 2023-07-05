import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Category, Prisma } from '@prisma/client';
import type { User } from '$lib/types/authjs-svelte';

export type Mix = Prisma.MixCreateWithoutMadeWithInput & {
	madeWith: Prisma.MixComponentCreateWithoutMixInput[];
	cook?: User;
};

const initState: Prisma.MixCreateWithoutMadeWithInput & {
	madeWith: Prisma.MixComponentCreateWithoutMixInput[];
} = {
	id: '',
	name: 'New Mix',
	isPublic: false,
	cook: {},
	category: 'Mix',
	madeWith: []
};
function createStoreMix() {
	const { subscribe, update } = localStorageStore<
		Prisma.MixCreateWithoutMadeWithInput & {
			madeWith: Prisma.MixComponentCreateWithoutMixInput[];
		}
	>('currentMix', initState);
	const actions = {
		addIngr: (ingrId: string) => {
			update((value) => {
				if (!value.madeWith.length) {
					value.id = `${value.category}-${ingrId.split('-')[1]}-${value.name.replaceAll(
						' ',
						'_'
					)}-${crypto.randomUUID().split('-')[0]}`.toUpperCase();
				}

				return {
					...value,
					madeWith: [...value.madeWith, { ingredientId: ingrId, amount: 1, purchase: 0 }]
				};
			});
		},
		removeIngr: (ingrId: string) =>
			update((value) => {
				const keep = value.madeWith.filter((madeWith) => {
					if (madeWith.ingredientId !== ingrId) return madeWith;
				});

				return { ...value, madeWith: keep };
			}),
		setIngrAmount: (id: string, newAmount: number) =>
			update((value) => {
				const keep = value;
				const foundIndex = value.madeWith.findIndex((x) => x.ingredientId === id);
				keep.madeWith[foundIndex] = { ...keep.madeWith[foundIndex], amount: newAmount };
				return keep;
			}),
		setMixName: (newName: string) =>
			update((value) => {
				const [category, type, name, hash] = value.id.split('-');
				return {
					...value,
					name: newName,
					id: `${category}-${type}-${newName}-${hash}`.toUpperCase()
				};
			}),
		setCategory: (newCatgory: Category) =>
			update((value) => {
				const [category, type, name, hash] = value.id.split('-');
				return {
					...value,
					category: newCatgory,
					id: `${newCatgory}-${type}-${name}-${hash}`.toUpperCase()
				};
			})
	};
	return {
		subscribe,
		actions
	};
}
export const storeMix = createStoreMix();
