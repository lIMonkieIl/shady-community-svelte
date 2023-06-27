<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import WeedGrowing from '$lib/data/WeedGrowingStats.json';
	import { RadioGroup, RadioItem, SlideToggle, Tab, TabGroup } from '@skeletonlabs/skeleton';
	let selectedSeed = WeedGrowing[0];
	$: {
		if (selectedSeed.inOrOut.toLowerCase() === 'outdoor') {
			showSetUpCost = false;
		} else {
			showSetUpCost = true;
		}
	}
	let cropAmount = 5;
	let showSetUpCost: boolean;
	let tabSet: number = 1;
	let sellPrice: number = 10;
	let show: 'crop' | 'plant' = 'crop';
	function seedData(show: 'crop' | 'plant', cropAmount: number) {
		if (show === 'crop') {
			return {
				wet: {
					g: `${(selectedSeed.grams * cropAmount).toFixed(1)} g`,
					hg: `${(selectedSeed.wetAmount * cropAmount).toFixed(1)} g`,
					per: ''
				},
				dry: {
					g: `${(selectedSeed.strainYield * selectedSeed.hours * cropAmount).toFixed(1)} g`,
					hg: `${(selectedSeed.strainYield * cropAmount).toFixed(1)} g`,
					per: `${selectedSeed.dryRate.toFixed(1)} %`
				},
				loss: {
					g: `${(
						(selectedSeed.grams - selectedSeed.strainYield * selectedSeed.hours) *
						cropAmount
					).toFixed(1)} g`,
					hg: `${(
						((selectedSeed.grams - selectedSeed.strainYield * selectedSeed.hours) * cropAmount) /
						selectedSeed.hours
					).toFixed(1)} g`,
					per: `${(100 - selectedSeed.dryRate).toFixed(1)} %`
				}
			};
		} else {
			return {
				wet: {
					g: `${selectedSeed.grams.toFixed(1)} g`,
					hg: `${selectedSeed.wetAmount.toFixed(1)} g`,
					per: ''
				},
				dry: {
					g: `${(selectedSeed.strainYield * selectedSeed.hours).toFixed(1)} g`,
					hg: `${selectedSeed.strainYield.toFixed(1)} g`,
					per: `${selectedSeed.dryRate.toFixed(1)} %`
				},
				loss: {
					g: `${(selectedSeed.grams - selectedSeed.strainYield * selectedSeed.hours).toFixed(1)} g`,
					hg: `${(
						(selectedSeed.grams - selectedSeed.strainYield * selectedSeed.hours) /
						selectedSeed.hours
					).toFixed(1)} g`,
					per: `${(100 - selectedSeed.dryRate).toFixed(1)} %`
				}
			};
		}
	}
	let includeSetupCosts: boolean = false;
	let sellOption: 'gang' | 'client' = 'client';
	function sellData(sellOption: 'gang' | 'client', sellPrice: number) {
		if (sellOption === 'client') {
			return {
				cost: {
					pg: (
						(selectedSeed.price * cropAmount) /
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2),
					total: selectedSeed.price * cropAmount
				},
				sell: {
					pg: sellPrice.toFixed(2),
					total: (sellPrice * (selectedSeed.strainYield * selectedSeed.hours * cropAmount)).toFixed(
						2
					)
				},
				profit: {
					pg: (
						((sellPrice -
							(selectedSeed.price * cropAmount) /
								(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
							(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) /
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2),
					total: (
						(sellPrice -
							(selectedSeed.price * cropAmount) /
								(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2)
				}
			};
		} else {
			return {
				cost: {
					pg: (
						(selectedSeed.price * cropAmount) /
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2),
					total: selectedSeed.price * cropAmount
				},
				sell: {
					pg: (4).toFixed(2),
					total: (4 * (selectedSeed.strainYield * selectedSeed.hours * cropAmount)).toFixed(2)
				},
				profit: {
					pg: (
						((4 -
							(selectedSeed.price * cropAmount) /
								(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
							(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) /
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2),
					total: (
						(4 -
							(selectedSeed.price * cropAmount) /
								(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2)
				}
			};
		}
	}
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
					<span>Seed Price</span>
					<input
						value={`$${selectedSeed.price}`}
						readonly
						class="input"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Crop Price</span>
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
				{#key show}
					<div class="flex gap-4 flex-col">
						<table class="table table-hover w-fit table-compact">
							<thead>
								<tr>
									<th>
										<select placeholder={'select'} bind:value={show} class="select w-fit">
											<option value={'plant'}>Plant</option>
											<option value={'crop'}>Crop</option>
										</select></th
									>
									<th>G</th>
									<th>G Per Hr</th>
									<th>%</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Wet</td>
									<td>{seedData(show, cropAmount).wet.g}</td>
									<td>{seedData(show, cropAmount).wet.hg}</td>
									<td>{seedData(show, cropAmount).wet.per}</td>
								</tr>
								<tr>
									<td>Dry</td>
									<td>{seedData(show, cropAmount).dry.g}</td>
									<td>{seedData(show, cropAmount).dry.hg}</td>
									<td>{seedData(show, cropAmount).dry.per}</td>
								</tr>
								<tr>
									<td>Loss</td>
									<td>{seedData(show, cropAmount).loss.g}</td>
									<td>{seedData(show, cropAmount).loss.hg}</td>
									<td>{seedData(show, cropAmount).loss.per}</td>
								</tr>
							</tbody>
						</table>
					</div>
				{/key}
			</div>
		{:else if tabSet === 2}
			<div class="flex w-full items-center justify-center">
				<div class="flex w-fit gap-4 flex-col">
					<div class="flex flex-col w-full gap-2">
						{#if showSetUpCost}
							<div class="flex items-center gap-2 justify-between">
								<span class="first-letter:capitalize font-semibold">include setup costs ? </span>
								<RadioGroup>
									<RadioItem
										class={'capitalize'}
										bind:group={includeSetupCosts}
										name="justify"
										value={false}>no</RadioItem
									>
									<RadioItem
										class={'capitalize'}
										bind:group={includeSetupCosts}
										name="justify"
										value={true}>yes</RadioItem
									>
								</RadioGroup>
							</div>
						{/if}

						<label class="label flex gap-2 items-center justify-between">
							<span class="font-semibold">sell price ?</span>
							<div class="input flex px-3 py-2 items-center w-32 justify-center">
								<span>$</span>
								<input
									class="input bg-transparent hover:bg-transparent p-0 m-0 border-none"
									min="1"
									bind:value={sellPrice}
									title="sell_price"
									type="number"
								/>
							</div>
						</label>
					</div>
					<!-- Native Table Element -->
					<table class="table table-hover w-full table-compact">
						<thead>
							<tr>
								<th>
									<select placeholder={'select'} bind:value={sellOption} class="select capitalize">
										<option class="capitalize" value={'gang'}>gang</option>
										<option value={'client'} class="capitalize">client</option>
									</select></th
								>
								<th>per g</th>
								<th>total</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>cost</td>
								<td>{sellData(sellOption, sellPrice).cost.pg}</td>
								<td>{sellData(sellOption, sellPrice).cost.total}</td>
							</tr>
							<tr>
								<td>sell</td>
								<td>{sellData(sellOption, sellPrice).sell.pg}</td>
								<td>{sellData(sellOption, sellPrice).sell.total}</td>
							</tr>
							<tr>
								<td>profit</td>
								<td>{sellData(sellOption, sellPrice).profit.pg}</td>
								<td>{sellData(sellOption, sellPrice).profit.total}</td>
							</tr>
						</tbody>
					</table>
				</div>
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
