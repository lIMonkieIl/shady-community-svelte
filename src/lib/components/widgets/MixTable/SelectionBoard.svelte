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
	function between(x: number, min: number, max: number) {
		return x >= min && x <= max;
	}
	function calIngrMinMaxCost(ingr: Ingredient) {
		if (!ingr.purchase) return null;
		const costs = ingr.purchase.map((item) => item.costs);
		const minCost = Math.min(...costs);
		const maxCost = Math.max(...costs);
		if (minCost === maxCost) {
			return `$${minCost.toFixed(2)}`;
		}
		return `$${minCost.toFixed(2)}g - $${maxCost.toFixed(2)}g`;
	}
	function calCategoryColor(ingr: Ingredient) {
		let color = 'variant-filled-warning';
		switch (ingr.category.toLowerCase()) {
			case 'additive':
				return (color = 'variant-filled-tertiary');

			case 'filler':
				return (color = 'variant-filled');
			case 'drug':
				return (color = 'variant-filled-error');
			case 'premix':
				return (color = 'variant-filled-warning');
			case 'mix':
				return (color = 'variant-filled-success');
		}
		return color;
	}
	function CalIngrChipColor(amount: number) {
		let color = '';
		if (between(amount, 0.0, 0.9)) {
			color = 'dark:bg-cyan-500 bg-cyan-400';
		} else if (between(amount, 1, 1.9)) {
			color = 'dark:bg-blue-500 bg-blue-400';
		} else if (between(amount, 2, 2.9)) {
			color = 'dark:bg-yellow-500 bg-yellow-400';
		} else if (between(amount, 3, 3.9)) {
			color = 'dark:bg-green-500 bg-green-400';
		} else if (between(amount, 4, 5.9)) {
			color = 'dark:bg-orange-500 bg-orange-400';
		} else if (between(amount, 6, 9.9)) {
			color = 'dark:bg-red-500 bg-red-400';
		} else if (between(amount, 10, 25)) {
			color = 'dark:bg-black bg-black';
		}
		return color;
	}
	function popupIngrInfo(id: string): PopupSettings {
		return { event: 'hover', target: `popupIngrInfo-${id}`, placement: 'top' };
	}
</script>

<div class="flex variant-filled- w-fit h-fit items-center">
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
					size={{ w: 'w-44', h: 'h-52' }}
					speed={0.8}
					border={''}
					background={'card variant-ghost-primary'}
					flippedBackground={'card variant-ghost-secondary'}
				>
					<svelte:fragment slot="front"
						><div
							class="flex items-center relative justify-between h-full p-3 cursor-alias flex-col"
						>
							<span
								class={`badge absolute capitalize top-2 font-bold left-2 ${calCategoryColor(
									ingredient
								)}`}>{ingredient.category.toLowerCase()}</span
							>

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
									<p class=" truncate">Price:</p>
									<p class=" truncate">
										{calIngrMinMaxCost(ingredient)}
									</p>
								</div>
							{/if}

							<button
								on:click={(e) => {
									e.stopPropagation();
									storeMix.actions.addIngr(ingredient.id);
								}}
								class="btn p-1 w-full h-fit variant-ghost-secondary">add</button
							>
						</div></svelte:fragment
					>
					<svelte:fragment slot="back">
						<div
							class="flex cursor-auto relative flex-col p-1 items-center justify-evenly w-full h-full"
						>
							<div
								class="card z-50 text-xs variant-filled-secondary"
								data-popup={`popupIngrInfo-${ingredient.id}`}
							>
								<div class="flex">
									<div class="">
										<div class="flex p-1 truncate items-center w-full justify-start gap-2">
											<div
												class="rounded-full ring-1 dark:ring-white ring-black dark:bg-cyan-500 bg-cyan-400 w-3 h-3"
											/>
											<span class="capitalize">very low</span>
										</div>
										<div class="flex p-1 truncate w-full items-center justify-start gap-2">
											<div
												class="rounded-full ring-1 dark:ring-white ring-black dark:bg-yellow-500 bg-yellow-400 w-3 h-3"
											/>
											<span class="capitalize">medium</span>
										</div>
										<div class="flex p-1 truncate w-full items-center justify-start gap-2">
											<div
												class="rounded-full ring-1 dark:ring-white ring-black dark:bg-orange-500 bg-orange-400 w-3 h-3"
											/>
											<span class="capitalize">very high</span>
										</div>
										<div class="flex p-1 truncate w-full items-center justify-start gap-2">
											<div
												class="rounded-full ring-1 dark:ring-white ring-black dark:bg-black bg-black w-3 h-3"
											/>
											<span class="capitalize">deadly</span>
										</div>
									</div>
									<div class="">
										<div class="flex p-1 truncate w-full items-center justify-start gap-2">
											<div
												class="rounded-full ring-1 dark:ring-white ring-black dark:bg-blue-500 bg-blue-400 w-3 h-3"
											/>
											<span class="capitalize">low</span>
										</div>
										<div class="flex p-1 truncate w-full items-center justify-start gap-2">
											<div
												class="rounded-full ring-1 dark:ring-white ring-black dark:bg-green-500 bg-green-400 w-3 h-3"
											/>
											<span class="capitalize">high</span>
										</div>

										<div class="flex p-1 truncate w-full items-center justify-start gap-2">
											<div
												class="rounded-full ring-1 dark:ring-white ring-black dark:bg-red-500 bg-red-400 w-3 h-3"
											/>
											<span class="capitalize">dangerous</span>
										</div>
									</div>
								</div>

								<div class="arrow variant-filled-secondary" />
							</div>
							<span
								class="absolute cursor-text select-text text-primary-400-500-token opacity-20 bottom-1 text-xs"
								>{ingredient.id}</span
							>
							{#if ingredient.cook}
								<div class="flex flex-col">
									<span class="capitalize font-semibold">cook:</span>
									<span class="first-letter:capitalize truncate">{ingredient.cook?.username}</span>
								</div>
							{/if}
							{#if ingredient.demandedIn?.length}
								<div class="flex flex-col">
									<span class="font-semibold">Sector Demand:</span>
									<span
										>{ingredient.demandedIn
											.map((mI) => mI.sector)
											.filter(onlyUnique)
											.sort()}</span
									>
								</div>
							{/if}

							<div
								class="flex capitalize gap-2 p-2 flex-wrap w-fit h-fit items-center justify-center"
							>
								<button
									use:popup={popupIngrInfo(ingredient.id)}
									on:click={(e) => {
										e.stopPropagation();
									}}
									class={`chip z-0 capitalize w-16 truncate opacity-90 ${CalIngrChipColor(
										ingredient.toxicity
									)}`}>tox: {ingredient.toxicity.toFixed(1)}</button
								>
								<button
									use:popup={popupIngrInfo(ingredient.id)}
									on:click={(e) => {
										e.stopPropagation();
									}}
									class={`chip z-0 capitalize w-16 truncate opacity-90 ${CalIngrChipColor(
										ingredient.strength
									)}`}>str: {ingredient.strength.toFixed(1)}</button
								>
								<button
									use:popup={popupIngrInfo(ingredient.id)}
									on:click={(e) => {
										e.stopPropagation();
									}}
									class={`chip z-0 capitalize w-16 truncate opacity-90 ${CalIngrChipColor(
										ingredient.addiction
									)}`}>addict: {ingredient.addiction.toFixed(1)}</button
								>
								<button
									use:popup={popupIngrInfo(ingredient.id)}
									on:click={(e) => {
										e.stopPropagation();
									}}
									class={`chip z-0 capitalize w-16 truncate opacity-90 ${CalIngrChipColor(
										ingredient.mixStrength
									)}`}>mixStr: {ingredient.mixStrength.toFixed(1)}</button
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
