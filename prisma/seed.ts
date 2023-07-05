import { PrismaClient } from '@prisma/client';
import ingredientsData from '../src/lib/data/Ingredients.json' assert { type: 'json' };
import drugsData from '../src/lib/data/Drugs.json' assert { type: 'json' };
import crypto from 'crypto';
const prisma = new PrismaClient();

async function main() {
	const mixIngredients = [
		{ ingredientId: drugsData[2].id, amount: 5 },
		{ ingredientId: ingredientsData[1].id, amount: 1 }
	];
	const mix = await prisma.mix.create({
		data: {
			category: 'Mix',
			cook: { connect: { discordId: '969337513430904932' } },
			id: 'Mix-TEST-MIX-' + crypto.randomUUID().split('-')[0].toUpperCase(),
			isPublic: false,
			name: 'test mix',
			madeWith: {
				createMany: {
					data: mixIngredients,
					skipDuplicates: true
				}
			}
		},
		include: {
			cook: { select: { discordId: true, displayName: true, avatar: true, username: true } },
			madeWith: { select: { amount: true, ingredientId: true } }
		}
	});
	console.log(`Successfully created new mix for user: ${mix.cook?.username} with id: ${mix.id}`);
	console.log(mix);
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
