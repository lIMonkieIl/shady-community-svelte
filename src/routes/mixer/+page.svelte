<script lang="ts">
	import { flip } from 'svelte/animate';
	import WidgetButton from '$lib/components/WidgetButton.svelte';
	import { storeWidgets } from '$lib/stores/storeWidgets';
	import { widgets, type Widget } from '$lib/components/widgets';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	// function retreiveWidgetContent(widget: Widget) {
	// 	const item = widgets.find((v) => v.id === widget.id);
	// 	return item?.content;
	// }
	import { draggable, type DragOptions } from '@neodrag/svelte';
	let options: DragOptions = {
		axis: 'both',
		bounds: 'parent',
		ignoreMultitouch: true,
		gpuAcceleration: true,
		legacyTranslate: false,
		transform: ({ offsetX, offsetY }) => `translate(${offsetX + 50}px, ${offsetY + 20}px)`
	};
</script>

<WidgetButton />
{#each $storeWidgets as widget}
	<div
		use:draggable={options}
		class="block w-64 h-fit overflow-hidden variant-ghost-primary card card-hover cursor-pointer"
	>
		<section class="overflow-hidden w-full">
			<img src={widget.image} class="h-20 rounded-container-token p-2 w-full object-cover" alt="" />
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
					on:click={() => storeWidgets.update((value) => (value = [...value, widget]))}
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
