<script lang="ts">
	import { storeTheme } from '$lib/stores/storeTheme';
	import { storeWidgets } from '$lib/stores/storeWidgets';
	import type { Widget } from './widgets';
	export let widget: Widget;
	function startDrag(
		e:
			| (MouseEvent & {
					currentTarget: EventTarget & HTMLDivElement;
			  })
			| (TouchEvent & { currentTarget: EventTarget & HTMLDivElement })
	) {
		// preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
		e.preventDefault();
		storeWidgets.actions.setIsDraggable(false);
	}
	function handleKeyDown(
		e: KeyboardEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		if ((e.key === 'Enter' || e.key === ' ') && $storeWidgets.dragDisabled)
			storeWidgets.actions.setIsDraggable(false);
	}
</script>

<div class="flex flex-col w-fit overflow-hidden">
	<div
		class="flex gap-2 items-center p-1 justify-around text-base card variant-ghost-secondary rounded-b-none"
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			tabindex={$storeWidgets.dragDisabled ? 0 : -1}
			aria-label="drag-handle"
			class="hover:scale-125 text-base duration-200 transition-all"
			style={$storeWidgets.dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
			on:mousedown={startDrag}
			on:touchstart={startDrag}
			on:keydown={handleKeyDown}
		>
			<i class="fa-solid fa-arrows-up-down" />
		</div>
		<button
			on:click={() => storeWidgets.actions.removeFromWidgets(widget)}
			class="hover:scale-125 duration-200 transition-all"
			><i class="fa-solid text-base fa-trash-alt" /></button
		>
	</div>

	<slot><!-- optional fallback --></slot>
</div>
