<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import { storeMix } from '$lib/stores/storeMix';
	import { fade } from 'svelte/transition';
	import Card from './Card.svelte';
	import {
		calCategoryColor,
		calIngrMinMaxCost,
		calMixDemand,
		onlyUnique,
		retrieveImage,
		type Ingredient,
		retrieveIngrCategory,
		retrieveIngrName,
		popupIngrInfo,
		CalIngrChipColor
	} from '$lib/helpers/mix';
	import ColorIndicator from './ColorIndicator.svelte';
	export let ingredients: Ingredient[];
</script>

<hr class="opacity-30 w-full" />
<div class="flex justify-center h-fit w-fit overflow-hidden gap-1 flex-wrap">
	{#if $storeMix.madeWith.length}
		{#each $storeMix.madeWith as madewith (madewith.ingredientId)}
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
									retrieveIngrCategory(madewith.ingredientId, ingredients) ?? ''
								)}`}
								>{(
									retrieveIngrCategory(madewith.ingredientId, ingredients) ?? ''
								).toLowerCase()}</span
							>

							<div class="flex flex-col items-center justify-center">
								<img
									loading="lazy"
									src={retrieveImage(madewith.ingredientId, ingredients)}
									class="w-16 h-16"
									alt={retrieveIngrName(madewith.ingredientId, ingredients)}
								/>
								<span class="capitalize select-text font-semibold"
									>{retrieveIngrName(madewith.ingredientId, ingredients)}</span
								>
							</div>
						</div></svelte:fragment
					>
					<svelte:fragment slot="back">
						<div
							class="flex cursor-auto relative flex-col p-1 items-center justify-evenly w-full h-full"
						>
							<div
								class="card z-50 p-1 text-xs variant-filled-secondary"
								data-popup={`popupIngrInfo-tox-${madewith.ingredientId}`}
							>
								<ColorIndicator />

								<div class="arrow variant-filled-secondary" />
							</div>
							<div
								class="card z-50 text-xs variant-filled-secondary"
								data-popup={`popupIngrInfo-addict-${madewith.ingredientId}`}
							>
								<ColorIndicator />

								<div class="arrow variant-filled-secondary" />
							</div>
							<div
								class="card z-50 text-xs variant-filled-secondary"
								data-popup={`popupIngrInfo-str-${madewith.ingredientId}`}
							>
								<ColorIndicator />

								<div class="arrow variant-filled-secondary" />
							</div>
							<div
								class="card z-50 text-xs variant-filled-secondary"
								data-popup={`popupIngrInfo-mixstr-${madewith.ingredientId}`}
							>
								<ColorIndicator />

								<div class="arrow variant-filled-secondary" />
							</div>
							<span
								class="absolute cursor-text select-text text-primary-400-500-token opacity-20 bottom-1 text-xs"
								>{madewith.ingredientId}</span
							>
							<!-- {#if ingredient.cook}
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
							{/if} -->

							<div
								class="flex capitalize gap-2 p-2 flex-wrap w-fit h-fit items-center justify-center"
							>
								<button
									use:popup={popupIngrInfo(madewith.ingredientId, 'tox')}
									on:click={(e) => {
										e.stopPropagation();
									}}
									class={`chip z-0 capitalize w-16 truncate opacity-90 ${CalIngrChipColor(
										ingredient.toxicity
									)}`}>tox: {ingredient.toxicity.toFixed(1)}</button
								>
								<button
									use:popup={popupIngrInfo(madewith.ingredientId, 'str')}
									on:click={(e) => {
										e.stopPropagation();
									}}
									class={`chip z-0 capitalize w-16 truncate opacity-90 ${CalIngrChipColor(
										ingredient.strength
									)}`}>str: {ingredient.strength.toFixed(1)}</button
								>
								<button
									use:popup={popupIngrInfo(madewith.ingredientId, 'addict')}
									on:click={(e) => {
										e.stopPropagation();
									}}
									class={`chip z-0 capitalize w-16 truncate opacity-90 ${CalIngrChipColor(
										ingredient.addiction
									)}`}>addict: {ingredient.addiction.toFixed(1)}</button
								>
								<button
									use:popup={popupIngrInfo(madewith.ingredientId, 'mixstr')}
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
				<h3 class="font-semibold">Mix is empty</h3>
			</div>
		</aside>
	{/if}
</div>
