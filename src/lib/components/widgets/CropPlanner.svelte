<script lang="ts">
	import { server_loads } from './../../../../.svelte-kit/generated/client/app.js';
	import WeedGrowing from '$lib/data/WeedGrowingStats.json';
	let selectedSeed = WeedGrowing[0];
	let cropAmount = 1;
</script>

<div class="">
	<select placeholder={'select'} bind:value={selectedSeed} class="select">
		{#each WeedGrowing as seed}
			<option value={seed}>{seed.strain}</option>
		{/each}
	</select>
	<label class="label">
		<span>amount</span>
		<input min="1" bind:value={cropAmount} class="input" title="seed_amount" type="number" />
	</label>
	<label class="label">
		<span>Seed Cost</span>
		<input value={`$${selectedSeed.price}`} readonly class="input" title="seed_cost" type="text" />
	</label>
	<label class="label">
		<span>Seed Crop Cost</span>
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
		<span>Grow Time (Hrs)</span>
		<input value={selectedSeed.hours} readonly class="input" title="seed_cost" type="text" />
	</label>
	<label class="label">
		<span>Water Every (Hrs)</span>
		<input value={selectedSeed.waterH} readonly class="input" title="seed_cost" type="text" />
	</label>
	<label class="label">
		<span># of times watered</span>
		<input
			value={(selectedSeed.hours / selectedSeed.waterH).toFixed(1)}
			readonly
			class="input"
			title="seed_cost"
			type="text"
		/>
	</label>
</div>
