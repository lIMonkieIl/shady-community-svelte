<script lang="ts">
	import BigLogoStack from '$lib/components/BigLogoStack.svelte';
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, AppRailTile, drawerStore, popup } from '@skeletonlabs/skeleton';
	import SmallLogo from './SmallLogo.svelte';
	import ThemeChanger from './ThemeChanger.svelte';
	// Local
	function onClickAnchor(): void {
		drawerStore.close();
	}
	export let className = '';
	export { className as class };
	let currentTile: number = 0;
</script>

<!-- App Rail -->
<AppRail
	class={`${
		$drawerStore.id === 'sidenav' && $drawerStore.open ? 'w-fit' : 'lg:w-24'
	}  ${className}`}
	border={`border-r border-surface-500/30`}
>
	<svelte:fragment slot="lead">
		{#if $drawerStore.id === 'sidenav' && $drawerStore.open}
			<AppRailAnchor
				on:click={() => {
					onClickAnchor();
				}}
				href="/"
			>
				<BigLogoStack size={'scale-50 -m-12'} />
			</AppRailAnchor>
		{/if}
	</svelte:fragment>

	<div class="m-2 overflow-hidden rounded-container-token">
		<!-- prettier-ignore -->
		<AppRailAnchor href="/" selected={$page.url.pathname === '/'} on:click={() => { onClickAnchor() }}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-home text-2xl" /></svelte:fragment>
			<span>Home</span>
		</AppRailAnchor>
	</div>
	<div class="m-2 overflow-hidden rounded-container-token">
		<!-- prettier-ignore -->
		<AppRailAnchor href="/about" selected={$page.url.pathname === '/about'}  on:click={() => { onClickAnchor() }}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-circle-info text-2xl"></i></svelte:fragment>
			<span>About</span>
		</AppRailAnchor>
	</div>

	<!-- --- / --- -->
	<hr class="opacity-30" />
	<div class="m-2 overflow-hidden rounded-container-token">
		<!-- prettier-ignore -->
		<AppRailAnchor href="/mixBoard" selected={$page.url.pathname === '/mixBoard'} on:click={() => { onClickAnchor() }}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-blender text-2xl" /></svelte:fragment>
			<span>Mix Board</span>
		</AppRailAnchor>
	</div>
</AppRail>
