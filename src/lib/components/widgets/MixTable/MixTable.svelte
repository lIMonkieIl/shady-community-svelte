<script lang="ts">
	import { flip } from 'svelte/animate';
	import IngredientsData from '$lib/data/Ingredients.json';
	import DrugsData from '$lib/data/Drugs.json';
	import {
		ListBox,
		ListBoxItem,
		popup,
		type PopupSettings,
		RadioGroup,
		RadioItem,
		filter,
		Avatar
	} from '@skeletonlabs/skeleton';
	import { fly, fade } from 'svelte/transition';
	import type { Widget } from '../widgets';
	import Card from '$lib/components/testing/Card.svelte';
	import WidgetButton from '$lib/components/WidgetButton.svelte';
	let viewValue: number = 1;
	let searchFilterValue: string = 'all';

	const popupSearchFilter: PopupSettings = {
		event: 'focus-click',
		target: 'popupSearchFilter',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
	function onlyUnique(value: any, index: number, array: any) {
		return array.indexOf(value) === index;
	}
	let ingredients = [
		...IngredientsData.map((ingr) => {
			return {
				...ingr,
				averagePrice: 0,
				knownAs: []
			};
		}),
		...DrugsData
	];
	let searchFilters = [...ingredients.map((i) => i.category).filter(onlyUnique), 'all', 'pre-mix'];
	let searchValue = '';
	$: items = ingredients
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
</script>

<div class={`flex flex-col overflow-scroll w-full h-full gap-2`}>
	<div class="flex gap-2 flex-wrap">
		<RadioGroup
			hover={' hover:variant-soft-secondary'}
			active={'variant-ghost-primary'}
			background={'variant-ghost-surface'}
		>
			<RadioItem
				class={'flex gap-2 justify-center items-center w-full'}
				bind:group={viewValue}
				name="mix-view"
				value={0}
			>
				<i class="fa-solid fa-blender" />
				<span>Mix</span></RadioItem
			>
			<RadioItem
				bind:group={viewValue}
				class={'flex gap-2 justify-center items-center w-full'}
				name="add-view"
				value={1}
			>
				<i class="fa-solid fa-plus-circle" />
				<span>Add</span></RadioItem
			>
		</RadioGroup>
		{#if viewValue === 0}
			<span>Mix Buttons</span>
		{:else if viewValue === 1}
			<div class="flex overflow-hidden w-fit h-fit items-center">
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
								class={'btn capitalize w-full variant-soft-secondary'}
								bind:group={searchFilterValue}
								name="medium"
								value={filter}>{filter.toLowerCase()}</ListBoxItem
							>
						{/if}
					{/each}
				</ListBox>
			</div>
		{/if}
	</div>
	<div class="flex justify-center h-full w-full overflow-x-scroll flex-wrap">
		{#if viewValue === 0}
			<span>Mix</span>
		{:else if viewValue === 1}
			{#if items.length}
				{#each items as ingredient (ingredient.id)}
					<Card
						speed={0.8}
						border={''}
						background={'card variant-ghost-primary'}
						flippedBackground={'card variant-ghost-secondary'}
					>
						<svelte:fragment slot="front"
							><div class="flex items-center relative justify-between h-full p-3 flex-col">
								<span
									class="absolute cursor-text select-text right-1 text-surface-400-500-token opacity-60 top-0 text-xs"
									>{ingredient.id}</span
								>
								<div class="flex flex-col items-center justify-center">
									<div class="card w-fit variant-soft-primary">
										<img
											loading="lazy"
											src={ingredient.image}
											class="w-20 h-20"
											alt={ingredient.name}
										/>
									</div>
									<span class="capitalize select-text font-semibold">{ingredient.name}</span>
								</div>

								<div>$10 - £14 per g</div>
								<button
									on:click={(e) => {
										e.stopPropagation();
									}}
									class="btn w-full variant-ghost-secondary">add</button
								>
							</div></svelte:fragment
						>
						<svelte:fragment slot="back">back</svelte:fragment>
					</Card>
				{/each}
			{:else}
				<div
					transition:fade|local={{ duration: 200 }}
					class="card gap-2 p-2 variant-ghost-surface flex items-center justify-center"
				>
					<span>Not Found:</span>
					<span class="code">filter: {searchFilterValue.toLowerCase()}, search: {searchValue}</span>
				</div>
			{/if}
		{/if}
	</div>
</div>

<!-- <div class="w-full text-base flex gap-2 flex-wrap">
		<div class="flex overflow-hidden w-fit h-fit items-center">
			<button
				class="btn w-fit h-fit rounded-r-none variant-ghost-primary"
				use:popup={popupCombobox}
			>
				<span class="capitalize truncate">{comboboxValue}</span>
				<i class="fa-solid fa-caret-down" />
			</button>
			<input
				class="input border-l-0 max-w-fit variant-ghost-primary h-fit w-32 rounded-l-none capitalize"
				type="text"
				placeholder={`name`}
			/>
		</div>
		Ingr Button
		<button
			on:click={() =>
				isAddIngredientsView ? (isAddIngredientsView = false) : (isAddIngredientsView = true)}
			class={`btn w-fit h-fit variant-ghost-primary`}
			><i class={`fa-solid ${isAddIngredientsView ? 'fa-blender' : 'fa-circle-plus'}`} /><span
				>{isAddIngredientsView ? 'Ingr Table' : 'Ingredients'}</span
			></button
		>
		<div class="card w-28 shadow-xl p-1 overflow-hidden" data-popup="popupCombobox">
			<ListBox rounded={'none'}>
				{#each comboBox as combo (combo.id)}
					{#if combo.name !== comboboxValue}
						<ListBoxItem
							class={'btn capitalize w-full variant-soft-secondary'}
							bind:group={comboboxValue}
							name="medium"
							value={combo.name}>{combo.name}</ListBoxItem
						>
					{/if}
				{/each}
			</ListBox>
		</div>
	</div>
	{#if isAddIngredientsView}
		<section>
			Ingr Table
			<div class="flex overflow-hidden w-fit h-fit items-center">
				<button
					class="btn w-fit h-fit rounded-r-none variant-ghost-primary"
					use:popup={popupSearchFilter}
				>
					<span class="capitalize truncate">{searchFilterValue}</span>
					<i class="fa-solid fa-caret-down" />
				</button>
				<input
					class="input border-l-0 max-w-fit variant-ghost-primary h-fit w-32 rounded-l-none capitalize"
					type="text"
					placeholder={`Search...`}
				/>
			</div>
			<div class="card w-28 shadow-xl p-1 overflow-hidden" data-popup="popupSearchFilter">
				<ListBox rounded={'none'}>
					{#each Ingredients as ingr (ingr.id)}
						{#if ingr.category !== searchFilterValue}
							<ListBoxItem
								class={'btn capitalize w-full variant-soft-secondary'}
								bind:group={searchFilterValue}
								name="medium"
								value={ingr.category}>{ingr.category}</ListBoxItem
							>
						{/if}
					{/each}
				</ListBox>
			</div>
		</section>
	{:else}
		<section>Mix Table</section>
	{/if} -->
