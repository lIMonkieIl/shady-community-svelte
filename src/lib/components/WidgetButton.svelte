<script lang="ts">
	import gridHelp from './Grid/utils/helper';
	import { storeWidget } from '$lib/stores/storeWidgets';
	import { Accordion, AccordionItem, type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import { STATUS, widgets } from './widgets/widgets';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { adjust } from './Grid/utils/item';

	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'widgets-panel',
		closeQuery: '#will-close'
	};
	$: inactiveWidgets = widgets
		.filter((w: any) => !$storeWidget.some((s: any) => s.id === w.id))
		.sort((a, b) => {
			const statusA = a.data.status;
			const statusB = b.data.status;
			function statusOrder(status: STATUS) {
				switch (status) {
					case STATUS.ACTIVE:
						return 0;
					case STATUS.BETA:
						return 1;
					case STATUS.INACTIVE:
						return 2;
					case STATUS.COMING_SOON:
						return 3;

					default:
						return 4;
				}
			}
			const orderA = statusOrder(statusA);
			const orderB = statusOrder(statusB);
			return orderA - orderB;
		});
</script>

<!-- popup trigger -->
<button use:popup={popupSettings} class="btn variant-ghost-primary">
	<i class="fa-solid fa-toolbox" />
	<span>Widgets</span>
	<i class="fa-solid fa-caret-down" />
</button>
<!-- popup -->
<div
	class="lg:ml-20 z-50 overflow-x-scroll p-4 min-h-fit max-h-[80%] w-72 card shadow-xl"
	data-popup="widgets-panel"
>
	<Accordion class={'card mb-4 variant-ghost-secondary'}>
		<AccordionItem>
			<svelte:fragment slot="lead"><i class={`fa-solid fa-info-circle`} /></svelte:fragment>
			<svelte:fragment slot="summary"><span class="font-semibold">How To</span></svelte:fragment>
			<svelte:fragment slot="content">
				<span
					>Just select a widget to add it to your mix board then arrange them in any order or layout
					by just dragging them around the mix board.</span
				></svelte:fragment
			>
		</AccordionItem>
		<!-- ... -->
	</Accordion>
	{#if inactiveWidgets.length}
		{#each inactiveWidgets as widget (widget.id)}
			<div
				animate:flip={{ delay: 200, duration: 400 }}
				transition:fly|local={{ x: 100, duration: 400 }}
				class="block overflow-hidden relative variant-ghost-primary card card-hover mb-4 cursor-pointer"
			>
				{#if widget.data.status === STATUS.BETA}
					<span class="badge absolute top-4 font-bold right-4 variant-filled-secondary">BETA</span>
				{:else if widget.data.status === STATUS.COMING_SOON}
					<span class="badge absolute top-4 font-bold right-4 variant-filled-surface"
						>COMING SOON</span
					>
				{/if}
				<section class="overflow-hidden w-full">
					<img
						src={widget.data.image}
						class="h-20 rounded-container-token p-2 w-full object-cover"
						alt=""
					/>
					<Accordion class={'!bg-transparent px-2'}>
						<AccordionItem>
							<svelte:fragment slot="lead"
								><i class={`fa-solid ${widget.data.icon}`} /></svelte:fragment
							>
							<svelte:fragment slot="summary">{widget.data.name}</svelte:fragment>
							<svelte:fragment slot="content">
								<span>{widget.data.about}</span></svelte:fragment
							>
						</AccordionItem>
						<!-- ... -->
					</Accordion>
					<div class="p-2 flex justify-center items-center">
						{#if widget.data.status === STATUS.ACTIVE}
							<button
								on:click|once={() => {
									storeWidget.set(gridHelp.adjust([...$storeWidget, widget], 16));
								}}
								type="button"
								class="btn w-full variant-ghost-secondary"
							>
								<i class="fa-solid fa-circle-plus" />
								<span class="font-semibold">Add Widget</span>
							</button>
						{:else if widget.data.status === STATUS.COMING_SOON}
							<button
								disabled
								on:click|once={() => {
									storeWidget.set(gridHelp.adjust([...$storeWidget, widget], 16));
								}}
								type="button"
								class="btn w-full variant-ghost-secondary"
							>
								<span class="font-semibold">Coming Soon</span>
							</button>
						{:else if widget.data.status === STATUS.INACTIVE}
							<button
								disabled
								on:click|once={() => {
									storeWidget.set(gridHelp.adjust([...$storeWidget, widget], 16));
								}}
								type="button"
								class="btn w-full variant-ghost-secondary"
							>
								<span class="font-semibold">Disabled</span>
							</button>
						{:else if widget.data.status === STATUS.BETA}
							<button
								on:click|once={() => {
									storeWidget.set(gridHelp.adjust([...$storeWidget, widget], 16));
								}}
								type="button"
								class="btn w-full variant-ghost-secondary"
							>
								<i class="fa-solid fa-circle-plus" />
								<span class="font-semibold">Add Widget</span>
							</button>
						{/if}
					</div>
				</section>
			</div>
		{/each}
	{:else}
		<div
			class="flex gap-4 p-4 items-center justify-start overflow-hidden variant-ghost-warning card card-hover cursor-pointer"
		>
			<i class="fa-solid text-lg fa-triangle-exclamation" /><span>All Widgets have been added.</span
			>
		</div>
	{/if}
</div>
