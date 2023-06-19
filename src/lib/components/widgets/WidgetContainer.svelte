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

<div class="flex">
	<div
		class="flex gap-2 items-center flex-col p-2 justify-around text-2xl card variant-ghost-secondary rounded-tr-none rounded-br-none"
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			tabindex={$storeWidgets.dragDisabled ? 0 : -1}
			aria-label="drag-handle"
			class="hover:scale-125 duration-200 transition-all"
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
			><i class="fa-solid text-xl fa-trash-alt" /></button
		>
	</div>

	<div class="card variant-ghost-surface flex p-1 overflow-hidden rounded-tl-none rounded-bl-none">
		<slot><!-- optional fallback --></slot>
	</div>
</div>
