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
	$: takeALoss = false;
	let cropAmount = 1;
	let showSetUpCost: boolean;
	let tabSet: number = 0;
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
	function sellData(sellOption: 'gang' | 'client', sellPrice: number, includeSetupCosts: boolean) {
		if (sellPrice === null) sellPrice = 0;
		let math =
			selectedSeed.price * cropAmount +
			(includeSetupCosts ? equipmentData(cropAmount).data.setUpCost : 0);

		if (sellOption === 'client') {
			takeALoss =
				((sellPrice - math / (selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
					(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) /
					(selectedSeed.strainYield * selectedSeed.hours * cropAmount) <=
				0;
			return {
				cost: {
					pg: `$ ${(math / (selectedSeed.strainYield * selectedSeed.hours * cropAmount)).toFixed(
						2
					)}`,
					total: `$ ${math.toFixed(2)}`
				},
				sell: {
					pg: `$ ${sellPrice.toFixed(2)}`,
					total: `$ ${(
						sellPrice *
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2)}`
				},
				profit: {
					pg: `$ ${(
						((sellPrice - math / (selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
							(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) /
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2)}`,
					total: `$ ${(
						(sellPrice - math / (selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2)}`
				}
			};
		} else {
			takeALoss =
				(4 - math / (selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
					(selectedSeed.strainYield * selectedSeed.hours * cropAmount) <=
				0;
			return {
				cost: {
					pg: `$ ${(math / (selectedSeed.strainYield * selectedSeed.hours * cropAmount)).toFixed(
						2
					)}`,
					total: `$ ${math.toFixed(2)}`
				},
				sell: {
					pg: `$ ${(4).toFixed(2)}`,
					total: `$ ${(4 * (selectedSeed.strainYield * selectedSeed.hours * cropAmount)).toFixed(
						2
					)}`
				},
				profit: {
					pg: `$ ${(
						((4 - math / (selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
							(selectedSeed.strainYield * selectedSeed.hours * cropAmount)) /
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2)}`,
					total: `$ ${(
						(4 - math / (selectedSeed.strainYield * selectedSeed.hours * cropAmount)) *
						(selectedSeed.strainYield * selectedSeed.hours * cropAmount)
					).toFixed(2)}`
				}
			};
		}
	}

	function equipmentData(cropAmount: number) {
		const filters = Math.ceil(cropAmount / 3.5);
		const lights = Math.ceil(cropAmount / 8);
		const dryers = Math.ceil(cropAmount / 1000);
		const costs = {
			filter: 300,
			light: 150,
			pot: 40,
			dryer: 450
		};
		const equipment = {
			text: {
				filters: {
					num: filters,
					each: `$ ${costs.filter.toFixed(2)}`,
					total: `$ ${(filters * costs.filter).toFixed(2)}`
				},
				lights: {
					num: lights,
					each: `$ ${costs.light.toFixed(2)}`,
					total: `$ ${(lights * costs.light).toFixed(2)}`
				},
				pots: {
					num: cropAmount,
					each: `$ ${costs.pot.toFixed(2)}`,
					total: `$ ${(cropAmount * costs.pot).toFixed(2)}`
				},
				dryers: {
					num: dryers,
					each: `$ ${costs.dryer.toFixed(2)}`,
					total: `$ ${(dryers * costs.dryer).toFixed(2)}`
				}
			},
			data: {
				filters: {
					num: filters,
					each: costs.filter,
					total: filters * costs.filter
				},
				lights: {
					num: lights,
					each: costs.light,
					total: lights * costs.light
				},
				pots: {
					num: cropAmount,
					each: costs.pot,
					total: cropAmount * costs.pot
				},
				dryers: {
					num: dryers,
					each: costs.dryer,
					total: dryers * costs.dryer
				}
			}
		};
		return {
			text: {
				...equipment.text,
				setUpCost: `$ ${(
					equipment.data.dryers.total +
					equipment.data.filters.total +
					equipment.data.lights.total +
					equipment.data.pots.total
				).toFixed(2)}`,
				totalCropCost: `$ ${(cropAmount * selectedSeed.price).toFixed(2)}`
			},
			data: {
				...equipment.data,
				setUpCost:
					equipment.data.dryers.total +
					equipment.data.filters.total +
					equipment.data.lights.total +
					equipment.data.pots.total,
				totalCropCost: cropAmount * selectedSeed.price
			}
		};
	}
</script>

<TabGroup
	class={'w-full h-full overflow-scroll'}
	active={'border-b-2 border-secondary-900-50-token'}
	justify="justify-center"
>
	<Tab bind:group={tabSet} name="tab0" value={0}>
		<span>Crop</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab1" value={1}>
		<span>Yield</span>
	</Tab>
	{#if showSetUpCost}
		<Tab bind:group={tabSet} name="tab3" value={3}>Set Up</Tab>
	{/if}
	<Tab bind:group={tabSet} name="tab2" value={2}>Profit</Tab>

	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class=" flex flex-wrap gap-2 overflow-scroll h-full w-full justify-center">
				<label class="label w-32">
					<span>Strain</span>
					<select
						placeholder={'select'}
						bind:value={selectedSeed}
						class="select variant-ghost-primary"
					>
						{#each WeedGrowing as seed}
							<option value={seed}>{seed.strain}</option>
						{/each}
					</select>
				</label>

				<label class="label w-32">
					<span>Crop Size</span>
					<input
						min="1"
						bind:value={cropAmount}
						class="input variant-ghost-primary"
						title="seed_amount"
						type="number"
					/>
				</label>
				<label class="label w-32">
					<span>Seed Price</span>
					<input
						value={`$${selectedSeed.price}`}
						readonly
						class="input variant-ghost-secondary"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Crop Price</span>
					<input
						value={`$${selectedSeed.price * cropAmount}`}
						readonly
						class="input variant-ghost-secondary"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Grown</span>
					<input
						value={selectedSeed.inOrOut}
						readonly
						class="input variant-ghost-secondary"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Grow Time</span>
					<input
						value={selectedSeed.hours + ' Hrs'}
						readonly
						class="input variant-ghost-secondary"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Water Every </span>
					<input
						value={selectedSeed.waterH + ' Hrs'}
						readonly
						class="input variant-ghost-secondary"
						title="seed_cost"
						type="text"
					/>
				</label>
				<label class="label w-32">
					<span>Needs Watering</span>
					<input
						value={(selectedSeed.hours / selectedSeed.waterH).toFixed(1) + ' Times'}
						readonly
						class="input variant-ghost-secondary"
						title="seed_cost"
						type="text"
					/>
				</label>
			</div>
		{:else if tabSet === 1}
			<div class="flex truncate flex-wrap gap-2 table-container justify-center">
				<!-- Native Table Element -->
				{#key show}
					<div class="flex gap-4 flex-col">
						<table class="table table-hover variant-ghost-surface max-w-sm table-compact">
							<thead class="">
								<tr>
									<th>
										<select
											placeholder={'select'}
											bind:value={show}
											class="select -m-2 variant-ghost-primary w-fit"
										>
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
			<div class="flex w-full items-center table-container justify-center">
				<div class="flex w-fit gap-4 items-center flex-col">
					<div class="flex flex-col w-fit gap-2">
						{#if showSetUpCost}
							<div class="flex items-center gap-2 justify-between">
								<span class="first-letter:capitalize font-semibold">include setup costs ? </span>
								<RadioGroup
									active={'variant-ghost-primary'}
									color={'selection:bg-secondary-400-500-token'}
									hover={'hover:variant-soft-primary selection:bg-secondary-400-500-token'}
								>
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
					</div>
					<!-- Native Table Element -->
					<table class="table table-hover max-w-sm variant-ghost table-compact">
						<thead>
							<tr>
								<th>
									<select
										placeholder={'select'}
										bind:value={sellOption}
										class="select -m-2 variant-ghost-primary w-fit truncate capitalize"
									>
										<option class="capitalize" value={'gang'}>gang</option>
										<option value={'client'} class="capitalize">client</option>
									</select></th
								>
								<th>per g</th>
								<th>total</th>
							</tr>
						</thead>
						<tbody class="capitalize">
							<tr>
								<td>cost</td>
								<td>{sellData(sellOption, sellPrice, includeSetupCosts).cost.pg}</td>
								<td>{sellData(sellOption, sellPrice, includeSetupCosts).cost.total}</td>
							</tr>
							<tr>
								<td>sell</td>
								<td>
									{#if sellOption === 'client'}
										<div
											class="input variant-ghost-primary rounded-container-token flex items-center w-20 p-1 -m-2 justify-center"
										>
											<span class="selection:bg-secondary-400-500-token">$</span>
											<input
												class="border-transparent focus:border-transparent selection:bg-secondary-400-500-token bg-transparent w-full focus:ring-0 p-0 m-0"
												min={1}
												bind:value={sellPrice}
												title="sell_price"
												type="number"
											/>
										</div>
									{:else}
										{sellData(sellOption, sellPrice, includeSetupCosts).sell.pg}
									{/if}
								</td>
								<td>{sellData(sellOption, sellPrice, includeSetupCosts).sell.total}</td>
							</tr>
							<tr>
								<td>profit</td>
								<td
									class={`${takeALoss ? 'text-error-400-500-token' : 'text-success-400-500-token'}`}
									>{sellData(sellOption, sellPrice, includeSetupCosts).profit.pg}</td
								>
								<td
									class={`${takeALoss ? 'text-error-400-500-token' : 'text-success-400-500-token'}`}
								>
									{sellData(sellOption, sellPrice, includeSetupCosts).profit.total}</td
								>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		{:else if tabSet === 3}
			<div
				class="flex truncate table-container flex-wrap w-full h-full gap-2 overflow-scroll justify-center"
			>
				<!-- Native Table Element -->
				<table class="table table-hover max-w-sm table-compact">
					<thead>
						<tr>
							<th>Equipment</th>
							<th>#</th>
							<th>Each</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody class="capitalize">
						<tr>
							<td>filters</td>
							<td>{equipmentData(cropAmount).text.filters.num}</td>
							<td>{equipmentData(cropAmount).text.filters.each}</td>
							<td>{equipmentData(cropAmount).text.filters.total}</td>
						</tr>
						<tr>
							<td>lights</td>
							<td>{equipmentData(cropAmount).text.lights.num}</td>
							<td>{equipmentData(cropAmount).text.lights.each}</td>
							<td>{equipmentData(cropAmount).text.lights.total}</td>
						</tr>
						<tr>
							<td>pots</td>
							<td>{equipmentData(cropAmount).text.pots.num}</td>
							<td>{equipmentData(cropAmount).text.pots.each}</td>
							<td>{equipmentData(cropAmount).text.pots.total}</td>
						</tr>
						<tr>
							<td>dryers</td>
							<td>{equipmentData(cropAmount).text.dryers.num}</td>
							<td>{equipmentData(cropAmount).text.dryers.each}</td>
							<td>{equipmentData(cropAmount).text.dryers.total}</td>
						</tr>
					</tbody>
					<tfoot class=" p-0">
						<tr class="">
							<th colspan="3" class="text-right">Total Crop Cost</th>
							<td>{equipmentData(cropAmount).text.totalCropCost}</td>
						</tr>
						<tr class="">
							<th colspan="3" class="text-right">Setup Cost</th>
							<td>{equipmentData(cropAmount).text.setUpCost}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>
