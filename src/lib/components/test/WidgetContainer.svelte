<script lang="ts">
	import { storeWidgets } from '$lib/stores/storeWidgets';

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

<div class="card flex">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		tabindex={$storeWidgets.dragDisabled ? 0 : -1}
		aria-label="drag-handle"
		class="w-10 h-10 card"
		style={$storeWidgets.dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
		on:mousedown={startDrag}
		on:touchstart={startDrag}
		on:keydown={handleKeyDown}
	/>
	<slot><!-- optional fallback --></slot>
</div>
