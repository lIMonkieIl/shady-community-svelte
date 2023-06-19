<script lang="ts">
	import { flip } from 'svelte/animate';
	import WidgetButton from '$lib/components/WidgetButton.svelte';
	import { storeWidgets } from '$lib/stores/storeWidgets';
	import { widgets, type Widget } from '$lib/components/widgets';
	import { dndzone, SOURCES, type Options, TRIGGERS } from 'svelte-dnd-action';
	import WidgetContainer from '$lib/components/test/WidgetContainer.svelte';
	function retreiveWidgetContent(widget: Widget) {
		const item = widgets.find((v) => v.id === widget.id);
		return item?.content;
	}
	const flipDurationMs = 300;
	$: items = $storeWidgets.widgets;
	function handleConsider(e: CustomEvent<DndEvent<Widget>>) {
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		items = newItems;
		// Ensure dragging is stopped on drag finish via keyboard
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			storeWidgets.actions.setIsDraggable(true);
		}
	}
	function handleFinalize(e: CustomEvent<DndEvent<Widget>>) {
		const {
			items: newItems,
			info: { source }
		} = e.detail;
		storeWidgets.actions.setWidgets(newItems);
		// Ensure dragging is stopped on drag finish via pointer (mouse, touch)
		if (source === SOURCES.POINTER) {
			storeWidgets.actions.setIsDraggable(true);
		}
	}
</script>

<WidgetButton />
<section
	class={`m-2 flex flex-col gap-2 p-2 ${
		!$storeWidgets.dragDisabled ? 'card variant-ghost-primary' : 'rounded-container-token'
	} transition-all duration-300`}
	use:dndzone={{
		items,
		dragDisabled: $storeWidgets.dragDisabled,
		flipDurationMs,
		dropTargetStyle: { outline: '0px' }
	}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<WidgetContainer>
				<svelte:component this={retreiveWidgetContent(item)} />
			</WidgetContainer>
		</div>
	{/each}
</section>
