<script lang="ts">
	let flipped = false;
</script>

<button class="card" class:flipped on:click={() => (flipped = !flipped)}>
	<div class="front">
		<slot name="front">font of card</slot>
	</div>
	<div class="back">
		<slot name="back">back of card</slot>
	</div>
</button>

<style>
	.card {
		position: relative;
		aspect-ratio: 2.5 / 3.5;
		font-size: min(1vh, 0.25rem);
		height: 80em;
		background: var(--bg-1);
		border-radius: 2em;
		transform: rotateY(180deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
		cursor: pointer;
	}

	.card.flipped {
		transform: rotateY(0);
	}

	.front,
	.back {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		border: 1px solid var(--fg-2);
		box-sizing: border-box;
		padding: 2em;
	}

	.front {
		background: url(./svelte-logo.svg) no-repeat 5em 5em,
			url(./svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
		background-size: 8em 8em, 8em 8em;
	}

	.back {
		transform: rotateY(180deg);
	}
</style>
