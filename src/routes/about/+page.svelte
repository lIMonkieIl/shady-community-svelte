<script lang="ts">
	import BigLogoStack from '$lib/components/BigLogoStack.svelte';
</script>

<section class="flex p-4 justify-center w-full">
	<div class="gap-4 flex-col flex">
		<div
			class="card variant-soft-surface items-center gap-5 flex flex-col text-center justify-center p-4"
		>
			<BigLogoStack size="w-full scale-150" />
			<span>
				Hello and welcome to &#34;Shady Community&#34; all built & designed by monkie#7152, Everyone
				is welcome to use everything on this site for free and without signing up.
			</span>
		</div>
		<div class="card variant-soft-surface items-center flex flex-col text-left justify-center p-4">
			<header class="card-header font-bold underline underline-offset-4">About:</header>
			<section class="flex flex-col items-start justify-center">
				<span>▶ Mixer: You can to test your mixes or even come you with new ones.</span>
				<span>▶ Crop Planner: You can plan your weed growing and setup costs.</span>
				<span
					>▶ Community: Here is where you can find the good stuff like mods & mixes made by the
					community.</span
				>
			</section>
		</div>
		<div class="card variant-soft-surface items-center flex flex-col text-left justify-center p-4">
			<header class="card-header font-bold underline underline-offset-4">
				A big thanks for the work of these guys:
			</header>
			<section class="flex flex-col items-start justify-center">
				<span
					>▶ 💥Huslaa💥#7624: for their hard work on reworking silent1 spread sheet (ps this is what
					prompted me to make a web gui).</span
				>
				<span>▶ Silent1#8557: The original spread sheet maker.</span>
				<span
					>▶ BobLeJongleur: For their work on sdk dumps and the scripts used for checking
					calculations.
				</span>
			</section>
		</div>
	</div>
</section>
