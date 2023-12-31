<script lang="ts">
	/**
	 * * The ordering of these imports is critical to the app working properly
	 */
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	/**
	 * * If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	 */
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	/**
	 * * Most of the app wide CSS is in this file
	 */
	import './../app.postcss';

	/**
	 * * Dependency: Floating UI
	 */
	import { Toast, storePopup, type ToastSettings, toastStore } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	/**
	 * * SvelteKit Imports
	 */
	import { browser } from '$app/environment';

	/**
	 * * Types
	 */
	import type { LayoutData, LayoutServerData } from './$types';

	/**
	 * * Stores
	 */
	import { storeTheme } from '$lib/stores/storeTheme';

	/**
	 * * Components & Utilities
	 */
	import { AppShell } from '@skeletonlabs/skeleton';
	import AppBar from '$lib/components/AppBar.svelte';
	import { page } from '$app/stores';
	import { beforeNavigate, invalidate } from '$app/navigation';
	import { updated } from '$app/stores';
	import Drawer from '$lib/components/Drawer.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ThemeChanger from '$lib/components/ThemeChanger.svelte';
	import { onMount } from 'svelte';

	/**
	 * * Set body `data-theme` based on current theme status
	 */
	storeTheme.subscribe(setBodyThemeAttribute);
	function setBodyThemeAttribute(): void {
		if (!browser) return;
		document.body.setAttribute('data-theme', $storeTheme);
	}

	/**
	 * * SEO Meta tags
	 */
	const metaDefaults = {
		title: 'Shady Community — Drug Dealer Simulator Calculator',
		description: 'Shady community is a mix calculator for the steam game Drug Dealer Simulator.',
		image: '/favicon.ico'
	};
	const meta = {
		title: metaDefaults.title,
		description: metaDefaults.description,
		image: metaDefaults.image,
		/**
		 * * Article
		 */
		article: { publishTime: '', modifiedTime: '', author: '' },
		/**
		 * * Twitter
		 */
		twitter: {
			title: metaDefaults.title,
			description: metaDefaults.description,
			image: metaDefaults.image
		}
	};
	page.subscribe((page) => {
		/**
		 * * Restore Page Defaults
		 */
		meta.title = metaDefaults.title;
		meta.description = metaDefaults.description;
		meta.image = metaDefaults.image;
		/**
		 * * Restore Twitter Defaults
		 */
		meta.twitter.title = metaDefaults.title;
		meta.twitter.description = metaDefaults.description;
		meta.twitter.image = metaDefaults.image;
	});

	/**
	 * * Exports
	 */
	export let data: LayoutServerData & LayoutData;

	/**
	 * Reactive
	 * * Current Theme Data
	 */
	$: ({ currentTheme } = data);

	/**
	 * * function that is ran before navigating to a new page
	 */
	beforeNavigate(({ willUnload, to }) => {
		/**
		 * * Checking to see if site has been updated if so refresh page to get updated content
		 */
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	import { Turnstile } from 'svelte-turnstile';
	let captchaPassed = false;
	function turnstileCallback(e: CustomEvent<{ token: string }>) {
		captchaPassed = true;
	}
	function turnstileError(e: CustomEvent<{}>) {
		console.log(e);
	}
	function turnstileExpired(e: CustomEvent<{}>) {
		console.log(e);
	}

	function turnstileTimeout(e: CustomEvent<{}>) {
		console.log(e);
	}
	export let form;
</script>

<!--* App Shell -->
<svelte:head>
	<title>{meta.title}</title>
	<!--* Meta Tags -->
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta
		name="keywords"
		content="drugs, drug, monkie, calculator, sim, dev, simulator, deal, dealer, game, steam, shady, community"
	/>
	<meta name="theme-color" content="#242c46" />
	<meta name="author" content="Monkie Dev" />
	<!--* Open Graph - https://ogp.me/ -->
	<meta property="og:site_name" content="Shady Community" />
	<meta property="og:type" content="website" />
	<!--TODO add base url-->
	<meta property="og:url" content={$page.url.pathname} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:secure_url" content={meta.image} />
	<meta property="og:image:type" content="image/jpg" />
	<meta property="og:image:width" content="1707" />
	<meta property="og:image:height" content="1233" />
	<!--* Open Graph: Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="" />
	<meta name="twitter:creator" content="" />
	<meta name="twitter:title" content={meta.twitter.title} />
	<meta name="twitter:description" content={meta.twitter.description} />
	<meta name="twitter:image" content={meta.twitter.image} />
	<!--! Select Preset Theme CSS DO NOT REMOVE ESCAPES-->
	{@html `\<style\>${currentTheme}}\</style\>`}
</svelte:head>
{#if captchaPassed}
	<Drawer />
	<Toast position={'tr'} class={'pt-16'} background={'card'} />
	<AppShell>
		<!--* Header -->
		<svelte:fragment slot="header">
			<!--* App Bar -->
			<AppBar {data} />
		</svelte:fragment>

		<!--* Sidebar (Left) -->
		<svelte:fragment slot="sidebarLeft">
			<Sidebar class={'hidden lg:block'} />
		</svelte:fragment>

		<!--* Page Content -->
		<slot />

		<!--* Page Footer -->
		<svelte:fragment slot="pageFooter"><div class="min-h-[15px]" /></svelte:fragment>
		<svelte:fragment slot="footer">
			<div class="absolute bottom-2 right-2">
				<ThemeChanger />
			</div>
		</svelte:fragment>
	</AppShell>
{:else}
	<form method="POST" action="?/captcha">
		<Turnstile siteKey="0x4AAAAAAAHQRUEAolaTezbW" theme="dark" />
	</form>
{/if}
<p>ccc {JSON.stringify(form)}</p>
