<script lang="ts">
	import gridHelp from './Grid/utils/helper';
	import { storeWidget } from '$lib/stores/storeWidgets';
	import { Accordion, AccordionItem, type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import { widgets } from './widgets/widgets';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { adjust } from './Grid/utils/item';

	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'widgets-panel',
		closeQuery: '#will-close'
	};
	$: inactiveWidgets = widgets.filter((w: any) => !$storeWidget.some((s: any) => s.id === w.id));
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
				class="block overflow-hidden variant-ghost-primary card card-hover mb-4 cursor-pointer"
			>
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
