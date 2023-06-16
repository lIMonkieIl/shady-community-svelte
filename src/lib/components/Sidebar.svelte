<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, AppRailTile, drawerStore } from '@skeletonlabs/skeleton';
	// Local
	let currentRailCategory: string | undefined;
	function onClickAnchor(): void {
		currentRailCategory = undefined;
		drawerStore.close();
	}
</script>

<!-- App Rail -->
<AppRail border="border-r hidden lg:block border-surface-500/30">
	<!-- Mobile Only -->
	<!-- prettier-ignore -->
	<AppRailAnchor href="/"  on:click={() => { onClickAnchor() }}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-home text-2xl" /></svelte:fragment>
			<span>Home</span>
		</AppRailAnchor>
	<!-- prettier-ignore -->
	<AppRailAnchor href="/about"  on:click={() => { onClickAnchor() }}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-bullhorn text-2xl" /></svelte:fragment>
			<span>About</span>
		</AppRailAnchor>
	<!-- --- / --- -->
	<hr class="opacity-30" />
	<AppRailTile bind:group={currentRailCategory} name="elements" value={'/elements'}>
		<svelte:fragment slot="lead">(ICON)</svelte:fragment>
		<span>Mixer</span>
	</AppRailTile>
	<AppRailTile bind:group={currentRailCategory} name="svelte" value={'/svelte'}>
		<svelte:fragment slot="lead"><i class="fa-solid fa-readme" /></svelte:fragment>
		<span>Svelte</span>
	</AppRailTile>
	<AppRailTile bind:group={currentRailCategory} name="utilities" value={'/utilities'}>
		<svelte:fragment slot="lead">(ICON)</svelte:fragment>
		<span>Utilities</span>
	</AppRailTile>
</AppRail>
