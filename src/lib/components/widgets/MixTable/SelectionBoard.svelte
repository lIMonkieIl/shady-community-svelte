<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { Ingredient } from '$lib/helpers/mix';

	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { storeMix } from '$lib/stores/storeMix';
	import Card from './Card.svelte';
	const popupSearchFilter: PopupSettings = {
		event: 'focus-click',
		target: 'popupSearchFilter',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
	function onlyUnique(value: any, index: number, array: any) {
		return array.indexOf(value) === index;
	}
	export let ingredients: Ingredient[];
	let searchValue = '';
	let searchFilters = [...ingredients.map((i) => i.category).filter(onlyUnique), 'all'];
	let searchFilterValue: string = 'all';
	$: items = ingredients
		.filter((ingr) => {
			const found = $storeMix.madeWith.find((madewith) => {
				if (ingr.id === madewith.ingredientId) {
					return madewith;
				}
			});
			if (!found) {
				return ingr;
			}
		})
		.filter((ingr) => {
			if (searchFilterValue === 'all' || searchFilterValue === ingr.category) {
				return ingr;
			}
		})
		.filter((ingr) => {
			if (ingr.name.toLowerCase().includes(searchValue.toLowerCase())) {
				return ingr;
			}
			if (ingr.knownAs?.find((i) => i.toLowerCase().includes(searchValue.toLowerCase()))) {
				return ingr;
			}
		});
	function calIngrMinMaxCost(ingr: Ingredient) {
		if (!ingr.purchase) return null;
		const costs = ingr.purchase.map((item) => item.costs);
		const minCost = Math.min(...costs);
		const maxCost = Math.max(...costs);
		if (minCost === maxCost) {
			return `$${minCost.toFixed(2)}`;
		}
		return `$${minCost.toFixed(2)} - $${maxCost.toFixed(2)}`;
	}
	// function calHighValues(value: 'strength' | 'addiction' | 'toxicity') {
	// 	let itemWithHighest = items[0];
	// 	for (let i = 1; i < items.length; i++) {
	// 		if (items[i][value] > itemWithHighest[value]) {
	// 			itemWithHighest = items[i];
	// 		}
	// 	}
	// 	return itemWithHighest;
	// }
</script>

<div class="flex w-fit h-fit items-center">
	<button
		class="btn w-fit h-fit rounded-r-none variant-ghost-primary"
		use:popup={popupSearchFilter}
	>
		<span class="capitalize truncate">{searchFilterValue.toLowerCase()}</span>
		<i class="fa-solid fa-caret-down" />
	</button>
	<input
		class="input border-l-0 max-w-fit variant-ghost-primary h-fit w-32 rounded-l-none"
		type="text"
		bind:value={searchValue}
		placeholder={`Search...`}
	/>
</div>
<div class="card w-28 z-50 shadow-xl p-1 overflow-hidden" data-popup="popupSearchFilter">
	<ListBox rounded={'none'}>
		{#each searchFilters as filter}
			{#if filter !== searchFilterValue}
				<ListBoxItem
					on:click|once
					class={'btn capitalize w-full variant-soft-secondary'}
					bind:group={searchFilterValue}
					name="medium"
					value={filter}>{filter.toLowerCase()}</ListBoxItem
				>
			{/if}
		{/each}
	</ListBox>
</div>
<hr class="opacity-30 w-full" />
<div class="flex justify-center h-fit w-fit overflow-hidden gap-1 flex-wrap">
	{#if items.length}
		{#each items as ingredient (ingredient.id)}
			<div transition:fade|local={{ duration: 200 }}>
				<Card
					size={{ w: 'w-40', h: 'h-52' }}
					speed={0.8}
					border={''}
					background={'card variant-ghost-primary'}
					flippedBackground={'card variant-ghost-secondary'}
				>
					<svelte:fragment slot="front"
						><div class="flex items-center relative justify-between h-full p-3 flex-col">
							<!-- {#if calHighValues('addiction') === ingredient}
								<span class="badge absolute top-4 font-bold right-4 variant-filled-warning"
									>High Addict</span
								>
							{:else if calHighValues('strength') === ingredient}
								<span class="badge absolute top-4 font-bold right-4 variant-filled-warning"
									>High Str</span
								>
							{:else if calHighValues('toxicity') === ingredient}
								<span class="badge absolute top-4 font-bold right-4 variant-filled-warning"
									>High Tox</span
								>
							{/if} -->

							<div class="flex flex-col items-center justify-center">
								<img
									loading="lazy"
									src={ingredient.image}
									class="w-16 h-16"
									alt={ingredient.name}
								/>
								<span class="capitalize select-text font-semibold">{ingredient.name}</span>
							</div>
							{#if calIngrMinMaxCost(ingredient) !== null}
								<div>
									{calIngrMinMaxCost(ingredient)} Per G
								</div>
							{/if}

							<button
								on:click={(e) => {
									e.stopPropagation();
									storeMix.actions.addIngr(ingredient.id);
								}}
								class="btn w-full h-fit variant-ghost-secondary">add</button
							>
						</div></svelte:fragment
					>
					<svelte:fragment slot="back">
						<div class="flex relative flex-col p-1 items-center justify-evenly w-full h-full">
							<span
								class="absolute cursor-text select-text text-primary-400-500-token opacity-20 bottom-1 text-xs"
								>{ingredient.id}</span
							>
							{#if ingredient.cook}
								<span>cook: {ingredient.cook?.username}</span>
							{/if}
							{#if ingredient.demandedIn?.length}
								<span
									>Sector: {ingredient.demandedIn.map((mI) => mI.sector).filter(onlyUnique)}</span
								>
							{/if}

							<div
								class="flex capitalize gap-2 p-2 flex-wrap w-fit h-fit items-center justify-center"
							>
								<span class="chip w-16 truncate variant-filled"
									>tox: {ingredient.toxicity.toFixed(1)}</span
								>
								<span class="chip w-16 truncate variant-filled"
									>str: {ingredient.strength.toFixed(1)}</span
								>
								<span class="chip w-16 truncate variant-filled"
									>addict: {ingredient.addiction.toFixed(1)}</span
								>
								<span class="chip w-16 truncate variant-filled"
									>mixStr: {ingredient.mixStrength.toFixed(1)}</span
								>
							</div>
						</div>
					</svelte:fragment>
				</Card>
			</div>
		{/each}
	{:else}
		<aside in:fade|local={{ duration: 200 }} class="alert variant-ghost-warning p-2 w-fit h-fit">
			<div class="flex gap-1 h-full w-full items-center justify-center">
				<h3 class="font-semibold">Not Found:</h3>
				<span class="code">filter: {searchFilterValue.toLowerCase()}, search: {searchValue}</span>
			</div>
		</aside>
	{/if}
</div>
