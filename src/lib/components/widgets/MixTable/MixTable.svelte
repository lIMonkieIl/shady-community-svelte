<script lang="ts">
	import SelectionBoard from './SelectionBoard.svelte';
	import { storeMix, type Mix } from '$lib/stores/storeMix';
	import { flip } from 'svelte/animate';
	import IngredientsData from '$lib/data/Ingredients.json';
	import DrugsData from '$lib/data/Drugs.json';
	import JSONTree from 'svelte-json-tree';
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
	import type { Ingredient } from '$lib/helpers/mix';

	let viewValue: number = 0;
	$: if (!$storeMix.madeWith.length) viewValue = 1;
	export let ingredients: Ingredient[];
</script>

<div class={`flex flex-col overflow-scroll w-full h-full gap-2`}>
	<div class="flex gap-2 w-fit overflow-scroll justify-start items-start flex-wrap">
		<RadioGroup
			class={'h-fit w-fit'}
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
			<SelectionBoard {ingredients} />
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
