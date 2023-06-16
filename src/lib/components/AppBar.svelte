<script lang="ts">
	import AuthButton from './AuthButton.svelte';
	import ThemeChanger from './ThemeChanger.svelte';
	import { drawerStore, type DrawerSettings, AppBar } from '@skeletonlabs/skeleton';
	import AppBarLogo from './AppBarLogo.svelte';

	// Drawer Handler
	function drawerOpen(): void {
		const s: DrawerSettings = {
			id: 'sidenav',
			width: 'w-fit',
			bgBackdrop: 'dark:bg-surface-900/50 backdrop-blur-sm bg-surface-100/50'
		};
		drawerStore.open(s);
	}
</script>

<AppBar shadow="shadow-xl">
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			<!-- Hamburger Menu -->
			<button on:click={drawerOpen} class="btn-icon btn-icon-sm lg:!hidden">
				<i class="fa-solid fa-bars text-xl" />
			</button>
			<!-- Logo -->
			<AppBarLogo />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<AuthButton />
	</svelte:fragment>
</AppBar>
