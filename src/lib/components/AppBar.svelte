<script lang="ts">
	import AppBarLogo from './AppBarLogo.svelte';
	import BigLogo from '$lib/components/BigLogo.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import {
		AppBar,
		popup,
		LightSwitch,
		type DrawerSettings,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import { customThemes, skeletonThemes, storeTheme } from '$lib/stores/stores';
	import { enhance } from '$app/forms';
	const themes = [...skeletonThemes, ...customThemes];
	const setTheme: SubmitFunction = () => {
		return async ({ result, update }) => {
			await update();
			if (result.type === 'success') {
				const theme = result.data?.theme;
				storeTheme.actions.setTheme(theme);
			}
		};
	};
	// Drawer Handler
	function drawerOpen(): void {
		const s: DrawerSettings = { id: 'doc-sidenav' };
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
		<!-- Theme -->
		<div>
			<!-- trigger -->
			<button
				class="btn hover:variant-soft-primary"
				use:popup={{ event: 'click', target: 'theme' }}
			>
				<i class="fa-solid fa-palette text-lg md:!hidden" />
				<span class="hidden md:inline-block">Theme</span>
				<i class="fa-solid fa-caret-down opacity-50" />
			</button>
			<!-- popup -->
			<div class="card p-4 w-60 shadow-xl" data-popup="theme">
				<div class="space-y-4">
					<section class="flex justify-between items-center">
						<h6 class="h6">Mode</h6>
						<LightSwitch />
					</section>
					<nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
						<form action="/?/setTheme" method="POST" use:enhance={setTheme}>
							<ul>
								{#each themes as { icon, name, type }}
									<li>
										<button
											class="option w-full h-full"
											type="submit"
											name="theme"
											value={type}
											class:bg-primary-active-token={$storeTheme === type}
										>
											<span>{icon}</span>
											<span class="capitalize">{name}</span>
										</button>
									</li>
								{/each}
							</ul>
						</form>
					</nav>
				</div>
				<div class="arrow bg-surface-100-800-token" />
			</div>
		</div>
	</svelte:fragment>
</AppBar>
