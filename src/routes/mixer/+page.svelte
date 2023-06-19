<script lang="ts">
	import { flip } from 'svelte/animate';
	import WidgetButton from '$lib/components/WidgetButton.svelte';
	import { storeWidgets } from '$lib/stores/storeWidgets';
	import { widgets, type Widget } from '$lib/components/widgets';
	import { dndzone } from 'svelte-dnd-action';
	function retreiveWidgetContent(widget: Widget) {
		const item = widgets.find((v) => v.id === widget.id);
		return item?.content;
	}
	function handleDnd(e: CustomEvent<DndEvent<Widget>>) {
		storeWidgets.set(e.detail.items);
	}
	const flipDurationMs = 300;
</script>

<WidgetButton />
<section
	class=""
	use:dndzone={{ items: $storeWidgets, flipDurationMs }}
	on:consider={handleDnd}
	on:finalize={handleDnd}
>
	{#each $storeWidgets as item (item.id)}
		<div class="" animate:flip={{ duration: flipDurationMs }}>
			<button
				on:click={() => {
					const updatedHero = $storeWidgets.filter((c) => c.id !== item.id);
					storeWidgets.set(updatedHero);
				}}>delete</button
			>
			<svelte:component this={retreiveWidgetContent(item)} />
		</div>
	{/each}
</section>
