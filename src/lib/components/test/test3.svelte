<script lang="ts">
	import { RangeSlider } from '@skeletonlabs/skeleton';

	let value = 15;
</script>

<h1 class={'bg-green-600'}>
	test3
	<RangeSlider name="range-slider" bind:value max={25} step={1} ticked>Label</RangeSlider>
</h1>
