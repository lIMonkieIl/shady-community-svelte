import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import ingredientsData from '../src/lib/data/Ingredients.json' assert { type: 'json' };
import drugsData from '../src/lib/data/Drugs.json' assert { type: 'json' };
import { get } from 'http';
const prisma = new PrismaClient();

async function main() {
	// async function createMix() {
	// 	const mix = await prisma.mix.create({
	// 		data: {
	// 			category: 'Premix',
	// 			cook: 'monkie',
	// 			id: 'PREMIX-SAFE-FENT-G1SDC5',
	// 			isPublic: false,
	// 			name: 'safe fent',
	// 			madeWith: {
	// 				createMany: {
	// 					data: [
	// 						{ ingredientId: ingredientsData[0].id, amount: 5 },
	// 						{ ingredientId: ingredientsData[1].id, amount: 1 }
	// 					],
	// 					skipDuplicates: true
	// 				}
	// 			}
	// 		},
	// 		include: { madeWith: { select: { amount: true, ingredientId: true } } }
	// 	});
	// 	console.log(`Successfully created new mix with id: ${mix.id}`);
	// 	console.log(mix);
	// }
	// async function getMix() {
	// 	const mix = await prisma.mix.findFirst({
	// 		where: { id: 'PREMIX-SAFE-FENT-G1SDC5' },
	// 		include: { madeWith: { select: { amount: true, ingredientId: true } } }
	// 	});
	// 	const madeWith: any = [];
	// 	mix?.madeWith.forEach((mw) => {
	// 		const find = [...ingredientsData, ...drugsData].find((ingr) => ingr.id == mw.ingredientId);
	// 		if (find) {
	// 			madeWith.push({ ...find, amount: mw.amount });
	// 		}
	// 	});
	// 	const mainIngr = madeWith[0];
	// 	const extendedMix = {
	// 		id: mix?.id,
	// 		name: mix?.name,
	// 		cook: mix?.cook,
	// 		category: mix?.category,
	// 		isPublic: mix?.isPublic,
	// 		image: mainIngr?.image,
	// 		type: mainIngr?.type,
	// 		isWet: mainIngr?.isWet,
	// 		averageSellPrice: mainIngr.averageSellPrice ?? 0,
	// 		knownAs: mainIngr.knownAs ?? [],
	// 		toxicity: 15,
	// 		strength: 2,
	// 		mixStrength: 2,
	// 		addiction: 1.4,
	// 		madeWith: madeWith
	// 	};
	// 	console.log(extendedMix);
	// }
	const update = await prisma.mix.updateMany({
		where: { cook: 'monkie' },
		data: { cook: '969337513430904932' }
	});
	console.log(`updated: ${update.count}`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})

	.catch(async (e) => {
		console.error(e);

		await prisma.$disconnect();

		process.exit(1);
	});
