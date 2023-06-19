<script lang="ts">
	import { Accordion, AccordionItem, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { widgets } from './widgets';
	import { storeWidgets } from '$lib/stores/storeWidgets';

	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'widgets-panel',
		closeQuery: '#will-close'
	};
	$: inactiveWidgets = widgets.filter((w) => !$storeWidgets.widgets.some((s) => s.id === w.id));
</script>

<!-- popup trigger -->
<div class="p-2">
	<button use:popup={popupSettings} class="btn variant-ghost-primary">
		<i class="fa-solid fa-toolbox" />
		<span>Widgets</span>
		<i class="fa-solid fa-caret-down" />
	</button>
	<!-- popup -->
	<div class="overflow-x-scroll lg:ml-20 p-4 h-4/5 w-72 card shadow-xl" data-popup="widgets-panel">
		<Accordion class={'card mb-4 variant-ghost-secondary'}>
			<AccordionItem>
				<svelte:fragment slot="lead"><i class={`fa-solid fa-info-circle`} /></svelte:fragment>
				<svelte:fragment slot="summary"><span class="font-semibold">How To</span></svelte:fragment>
				<svelte:fragment slot="content">
					<span
						>Just select a widget to add it to your mix board then arrange them in any order or
						layout by just dragging them around the mix board.</span
					></svelte:fragment
				>
			</AccordionItem>
			<!-- ... -->
		</Accordion>
		{#each inactiveWidgets as widget}
			<div class="block overflow-hidden variant-ghost-primary card card-hover mb-4 cursor-pointer">
				<section class="overflow-hidden w-full">
					<img
						src={widget.image}
						class="h-20 rounded-container-token p-2 w-full object-cover"
						alt=""
					/>
					<Accordion class={'!bg-transparent px-2'}>
						<AccordionItem>
							<svelte:fragment slot="lead"><i class={`fa-solid ${widget.icon}`} /></svelte:fragment>
							<svelte:fragment slot="summary">{widget.name}</svelte:fragment>
							<svelte:fragment slot="content">
								<span>{widget.about}</span></svelte:fragment
							>
						</AccordionItem>
						<!-- ... -->
					</Accordion>
					<div class="p-2 flex justify-center items-center">
						<button
							on:click={() => storeWidgets.actions.addToWidgets(widget)}
							id="will-close"
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
	</div>
</div>
