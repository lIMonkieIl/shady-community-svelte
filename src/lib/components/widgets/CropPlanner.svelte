<script lang="ts">
	import { server_loads } from './../../../../.svelte-kit/generated/client/app.js';
	import WeedGrowing from '$lib/data/WeedGrowingStats.json';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	let selectedSeed = WeedGrowing[0];
	let cropAmount = 1;
</script>

<div class="h-full my-10 flex flex-col gap-2">
	<label class="label">
		<span>Strain</span>
		<select placeholder={'select'} bind:value={selectedSeed} class="select">
			{#each WeedGrowing as seed}
				<option value={seed}>{seed.strain}</option>
			{/each}
		</select>
	</label>

	<label class="label">
		<span>Crop Size</span>
		<input min="1" bind:value={cropAmount} class="input" title="seed_amount" type="number" />
	</label>
	<label class="label">
		<span>Seed Cost</span>
		<input value={`$${selectedSeed.price}`} readonly class="input" title="seed_cost" type="text" />
	</label>
	<label class="label">
		<span>Crop Cost</span>
		<input
			value={`$${selectedSeed.price * cropAmount}`}
			readonly
			class="input"
			title="seed_cost"
			type="text"
		/>
	</label>
	<label class="label">
		<span>Grown</span>
		<input value={selectedSeed.inOrOut} readonly class="input" title="seed_cost" type="text" />
	</label>
	<label class="label">
		<span>Grow Time</span>
		<input
			value={selectedSeed.hours + ' Hrs'}
			readonly
			class="input"
			title="seed_cost"
			type="text"
		/>
	</label>
	<label class="label">
		<span>Water Every </span>
		<input
			value={selectedSeed.waterH + ' Hrs'}
			readonly
			class="input"
			title="seed_cost"
			type="text"
		/>
	</label>
	<label class="label">
		<span>Needs Watering</span>
		<input
			value={(selectedSeed.hours / selectedSeed.waterH).toFixed(1) + ' Times'}
			readonly
			class="input"
			title="seed_cost"
			type="text"
		/>
	</label>
	<Accordion class={'card mb-4 variant-ghost-secondary'}>
		<AccordionItem>
			<svelte:fragment slot="lead">
				<!-- <i class={`fa-solid fa-info-circle`} /> -->
			</svelte:fragment>
			<svelte:fragment slot="summary"
				><span class="font-semibold">Set Up Costs</span></svelte:fragment
			>
			<svelte:fragment slot="content">
				<span
					>Just select a widget to add it to your mix board then arrange them in any order or layout
					by just dragging them around the mix board.</span
				>
			</svelte:fragment>
		</AccordionItem>
		<!-- ... -->
	</Accordion>
</div>
