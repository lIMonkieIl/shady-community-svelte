<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Grid from '$lib/components/Grid/index.svelte';
	import { storeWidget } from '$lib/stores/storeWidgets';
	import type { Widget } from '$lib/components/widgets/widgets';
	import { ProgressRadial, type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import Options from '$lib/components/widgets/Options.svelte';
	import MixTable from '$lib/components/widgets/MixTable/MixTable.svelte';
	import AreaDemand from '$lib/components/widgets/AreaDemand.svelte';
	import MixStats from '$lib/components/widgets/MixStats.svelte';
	import ProfitsTable from '$lib/components/widgets/ProfitsTable.svelte';
	import Actions from '$lib/components/widgets/Actions.svelte';
	import CropPlanner from '$lib/components/widgets/CropPlanner.svelte';
	import WidgetButton from '$lib/components/WidgetButton.svelte';

	export let data;
	$: layout = $storeWidget;
	$: items = layout;
	const cols = [[1100, 16]];
	let gridMounted = false;
	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'mixboard-options-panel'
	};
	$: fillSpace = false;
	function popupHover(id: number): PopupSettings {
		return {
			event: 'hover',
			target: `help-${id}`,
			placement: 'bottom'
		};
	}
</script>

{#if !gridMounted}
	<div
		transition:fade
		class="absolute z-50 h-full w-full flex items-center bg-surface-backdrop-token backdrop-blur-sm justify-center"
	>
		<ProgressRadial
			stroke={60}
			meter="dark:stroke-primary-500 stroke-primary-200"
			track="dark:stroke-primary-500/30 stroke-primary-200/30"
		/>
	</div>
{/if}
<div class="p-2">
	<WidgetButton />
	<button use:popup={popupSettings} class="btn variant-ghost-primary">
		<i class="fa-solid fa-gear" />
		<span>Options</span>
		<i class="fa-solid fa-caret-down" />
	</button>
	<div
		class="card lg:ml-20 gap z-50 overflow-x-scroll p-4 min-h-fit max-h-[80%] w-fit shadow-xl"
		data-popup="mixboard-options-panel"
	>
		<div class="flex flex-col w-full gap-2">
			<button on:click={() => storeWidget.set([])} class="btn w-full variant-ghost-secondary"
				>Clear Board</button
			>
			<label class="flex items-center space-x-2">
				<input class="checkbox" type="checkbox" bind:checked={fillSpace} />
				<p>Fill Space</p>
			</label>
		</div>
	</div>
</div>

<div class={`px-2`}>
	{#if gridMounted && !items.length}
		<div class="card p-2 w-fit variant-ghost-warning">
			<span class="font-semibold">Mix board is empty</span>
			<span class="">to get started click on the "Widgets" button above and add a new widget.</span>
		</div>
	{/if}
	{#key fillSpace}
		<Grid
			let:size
			on:change={(e) => {
				storeWidget.set(items);
			}}
			sensor={100}
			{fillSpace}
			bind:items
			gap={[5, 5]}
			rowHeight={50}
			on:mount={() => (gridMounted = true)}
			let:item
			let:dataItem
			let:resizePointerDown
			{cols}
			let:movePointerDown
		>
			<div
				class={`flex ${
					dataItem.collapsed.active ? 'h-8' : 'h-full'
				} card variant-ghost-secondary flex-col w-full  overflow-hidden`}
			>
				{#if dataItem.data.helper !== null}
					<div class="card z-50 p-4 variant-filled-secondary" data-popup={`help-${dataItem.id}`}>
						<h1>Tips:</h1>
						{#each dataItem.data.helper as help}
							<p class="first-letter:capitalize">{help}.</p>
						{/each}
						<div class="arrow variant-filled-secondary" />
					</div>
				{/if}

				<div class={`flex px-3 gap-4 items-center p-1 justify-between  text-base rounded-b-none`}>
					<button
						on:click={(e) => {
							e.preventDefault();
							storeWidget.actions.collapsWidgetToggle(dataItem);
						}}
						class={`group flex  items-center justify-center gap-3 ${size.w <= 150 && 'hidden'}`}
					>
						<span class={` ${size.w <= 250 && 'hidden'} h6 truncate font-semibold`}
							>{dataItem.data.name}</span
						>
						<i
							class={`fa-solid group-hover:scale-125 duration-200 transition-all ${
								dataItem.collapsed.active ? 'fa-angle-up' : 'fa-angle-down'
							}`}
						/>
					</button>
					<div
						class={`flex ${
							dataItem[16].fixed && 'hidden'
						} active:cursor-grabbing flex items-center hover:scale-125 duration-200 transition-all justify-center w-full`}
						on:pointerdown={(e) => {
							if (dataItem[16].fixed) {
								return;
							}
							movePointerDown(e);
						}}
					>
						<i class="fa-solid text-base fa-grip" />
					</div>
					<div class={`flex justify-center items-center gap-4 ${size.w <= 150 && 'hidden'}`}>
						{#if dataItem.data.helper?.length}
							<button
								use:popup={popupHover(dataItem.id)}
								class={`hover:scale-125 duration-200 transition-all `}
								><i class="fa-solid text-fas fa-info-circle" /></button
							>
						{/if}

						<button
							on:click|once={() => storeWidget.actions.removeFromWidgets(dataItem)}
							class={`hover:scale-125 duration-200 transition-all ${
								dataItem[16].fixed && 'hidden'
							}`}><i class="fa-solid text-base fa-trash-alt" /></button
						>
						<button
							on:click={() => storeWidget.actions.lockWidgetToggle(dataItem)}
							class="hover:scale-125 duration-200 transition-all"
							><i
								class={`fa-solid ${
									dataItem[16].fixed ? 'fa-lock text-error-50-900-token' : 'fa-lock-open '
								}`}
							/></button
						>
					</div>
				</div>
				{#if !dataItem.collapsed.active}
					<div class={`card h-full w-full p-2 overflow-hidden rounded-t-none rounded-b-none`}>
						{#if dataItem.id === 1}
							<Options />
						{:else if dataItem.id === 2}
							<MixTable ingredients={data.ingredients} />
						{:else if dataItem.id === 3}
							<AreaDemand />
						{:else if dataItem.id === 4}
							<ProfitsTable />
						{:else if dataItem.id === 5}
							<MixStats />
						{:else if dataItem.id === 6}
							<Actions />
						{:else if dataItem.id === 7}
							<CropPlanner />
						{/if}
					</div>
				{/if}

				<div
					class={`h-4 ${dataItem[16].fixed ? 'cursor-default' : 'cursor-nwse-resize'}`}
					on:pointerdown={(e) => {
						if (dataItem[16].fixed) {
							return;
						}
						resizePointerDown(e);
					}}
				/>
			</div>
		</Grid>
	{/key}
</div>
