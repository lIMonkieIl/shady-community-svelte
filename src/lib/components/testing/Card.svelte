<script lang="ts">
	import { blur } from 'svelte/transition';

	let flipped = false;
	export let background = 'bg-red-500';
	export let border = 'border rounded';
	export let flippedBackground: string | undefined = undefined;
	export let speed = 0.5;
</script>

<div class="scene m-0.5 z-10 w-52 h-64">
	<button
		class={`${
			typeof flippedBackground === 'string'
				? flipped
					? flippedBackground
					: background
				: background
		} ${border} card-hover main relative w-full h-full`}
		class:flipped
		style={`transition: transform ${speed}s, background-color ${0.2}s; transition-delay: 0s, ${
			speed / 4
		}s;`}
		on:click={(e) => {
			flipped = !flipped;
		}}
	>
		{#if flipped}
			<div
				transition:blur={{ delay: speed, amount: 40 }}
				class="h-full w-full top-0 overflow-hidden absolute cardBack"
			>
				<slot name="back"><span>back of card</span></slot>
			</div>
		{:else}
			<div
				transition:blur={{ delay: speed, amount: 40 }}
				class={`h-full w-full top-0 overflow-hidden absolute`}
			>
				<slot name="front"><span>front of card</span></slot>
			</div>
		{/if}
	</button>
</div>

<style>
	.scene {
		perspective: 600px;
	}

	.main {
		transform-style: preserve-3d;
		transform-origin: center right;
	}

	.main.flipped {
		transform: translateX(-100%) rotateY(-180deg);
	}

	.cardBack {
		transform: rotateY(180deg);
	}
</style>
