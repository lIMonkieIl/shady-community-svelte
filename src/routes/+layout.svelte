<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	// Dependency: Floating UI
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
	import { AppShell } from '@skeletonlabs/skeleton';
	import { storeTheme } from '$lib/stores/stores';
	import { browser } from '$app/environment';
	import AppBar from '$lib/components/AppBar.svelte';
	storeTheme.subscribe(setBodyThemeAttribute);
	function setBodyThemeAttribute(): void {
		if (!browser) return;
		document.body.setAttribute('data-theme', $storeTheme);
	}
	$: ({ currentTheme } = data);
</script>

<!-- App Shell -->
<svelte:head>
	{@html `\<style\>${currentTheme}}\</style\>`}
</svelte:head>
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar />
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- Page Content -->
	<slot />
	<!-- (pageFooter) -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
</AppShell>
