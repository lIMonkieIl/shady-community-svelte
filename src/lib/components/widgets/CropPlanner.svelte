<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import WeedGrowing from '$lib/data/WeedGrowingStats.json';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	let selectedSeed = WeedGrowing[0];
	$: {
		if (selectedSeed.inOrOut.toLowerCase() === 'outdoor') {
			showSetUpCost = false;
		} else {
			showSetUpCost = true;
		}
	}
	let cropAmount = 1;
	let showSetUpCost: boolean;
	let tabSet: number = 0;
	let sellPrice: number = 10;
</script>

<TabGroup class={'w-full h-full overflow-scroll'} justify="justify-center">
	<Tab bind:group={tabSet} name="tab0" value={0}>
		<span>Crop</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab1" value={1}>
		<span>Yield</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab2" value={2}>Sell</Tab>
	{#if showSetUpCost}
		<Tab bind:group={tabSet} name="tab3" value={3}>Set Up</Tab>
	{/if}

	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class=" flex flex-wrap gap-2 overflow-scroll h-full w-full justify-center">
				<label class="label w-32">
					<span>Strain</span>
					<select placeholder={'select'} bind:value={selectedSeed} class="select">
						{#each WeedGrowing as seed}
							<option value={seed}>{seed.strain}</option>
						{/each}
					</select>
				</label>

				<label class="label w-32">
					<span>Crop Size</span>
					<input min="1" bind:value={cropAmount} class="input" title="seed_amount" type="number" />
				</label>
				<label class="label w-32">
					<span>Seed Cost</span>
					<input
						value={`$${selectedSeed.price}`}
						readonly
						class="input"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Crop Cost</span>
					<input
						value={`$${selectedSeed.price * cropAmount}`}
						readonly
						class="input"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Grown</span>
					<input
						value={selectedSeed.inOrOut}
						readonly
						class="input"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Grow Time</span>
					<input
						value={selectedSeed.hours + ' Hrs'}
						readonly
						class="input"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Water Every </span>
					<input
						value={selectedSeed.waterH + ' Hrs'}
						readonly
						class="input"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Needs Watering</span>
					<input
						value={(selectedSeed.hours / selectedSeed.waterH).toFixed(1) + ' Times'}
						readonly
						class="input"
						title="seed_cost"
						type="text"
					/>
				</label>
			</div>
		{:else if tabSet === 1}
			<div class="flex truncate flex-wrap gap-2 justify-center">
				<!-- Native Table Element -->
				<table class="table table-hover max-w-[15rem] table-compact">
					<thead>
						<tr>
							<th>Plant</th>
							<th>G</th>
							<th>G/H</th>
							<th>%</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Wet</td>
							<td>205</td>
							<td>2.62</td>
							<td />
						</tr>
						<tr>
							<td>Dry</td>
							<td>74.10</td>
							<td>0.95</td>
							<td>36.00%</td>
						</tr>
						<tr>
							<td>Loss</td>
							<td>130.90</td>
							<td />
							<td>64.00%</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-hover max-w-[15rem] table-compact">
					<thead>
						<tr>
							<th>Crop</th>
							<th>G</th>
							<th>G/H</th>
							<th>%</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Wet</td>
							<td>1640</td>
							<td>20.96</td>
							<td />
						</tr>
						<tr>
							<td>Dry</td>
							<td>593</td>
							<td>7.60</td>
							<td>36.00%</td>
						</tr>
						<tr>
							<td>Loss</td>
							<td>1047.2</td>
							<td />
							<td>64.00%</td>
						</tr>
					</tbody>
				</table>
			</div>
		{:else if tabSet === 2}
			<div class="flex truncate flex-wrap gap-2 justify-center">
				<!-- Native Table Element -->
				<table class="table table-hover max-w-[15rem] table-compact">
					<thead>
						<tr>
							<th>Gang</th>
							<th>Per G</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Cost</td>
							<td>$0.61</td>
							<td>$360.00</td>
						</tr>
						<tr>
							<td>Sell</td>
							<td>$4.00</td>
							<td>$2,371.20</td>
						</tr>
						<tr>
							<td>Profit</td>
							<td>$3.39</td>
							<td>$2,011.20</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-hover max-w-[15rem] table-compact">
					<thead>
						<tr>
							<th>Client</th>
							<th>Per G</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Cost</td>
							<td>$0.61</td>
							<td>$360.00</td>
						</tr>
						<tr>
							<td>Sell</td>
							<td>
								<div
									class="input -mt-2 -mb-2 items-center p-1 justify-center flex rounded-container-token w-20"
								>
									$
									<input
										min="10"
										bind:value={sellPrice}
										class="input border-none p-0 m-0 rounded-container-token"
										title="sell_price"
										type="number"
									/>
								</div>
							</td>
							<td>$2,371.20</td>
						</tr>
						<tr>
							<td>Profit</td>
							<td>$3.39</td>
							<td>$2,011.20</td>
						</tr>
					</tbody>
				</table>
			</div>
		{:else if tabSet === 3}
			<div class="flex truncate flex-wrap gap-2 justify-center">
				<!-- Native Table Element -->
				<table class="table table-hover max-w-[15rem] table-compact">
					<thead>
						<tr>
							<th>Equipment</th>
							<th>#</th>
							<th>Each</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Lights</td>
							<td>2</td>
							<td>$300</td>
							<td>$685.71</td>
						</tr>
						<tr>
							<td>Pots</td>
							<td>2</td>
							<td>$300</td>
							<td>$685.71</td>
						</tr>
						<tr>
							<td>Dryers</td>
							<td>2</td>
							<td>$300</td>
							<td>$685.71</td>
						</tr>
					</tbody>
					<tfoot>
						<tr class="table-row-checked">
							<th class="text-right" colspan="3">Setup Cost</th>
							<td>100</td>
						</tr>
						<tr class="table-row-checked">
							<th class="text-right" colspan="3">Total Crop Cost</th>
							<td>100</td>
						</tr>
					</tfoot>
				</table>
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>
