<!-- ./src/lib/components/AuthButton.svelte -->
<script lang="ts">
	// Import necessary modules and types
	import type { PageData } from '../../routes/$types';
	import { goto, invalidateAll } from '$app/navigation';
	import { toastStore, Avatar, popup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { AUTH_ERROR } from '$lib/types/types';

	// Export the 'data' prop of type PageData
	export let data: PageData;

	// Destructure the 'supabase' property from the 'data' prop
	let { supabase, session, profile } = data;

	// Reassign the 'supabase' variable whenever 'data' changes
	$: ({ supabase, session, profile } = data);

	// Define an asynchronous function to handle Discord sign-in
	async function handleDiscordSignIn() {
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: { redirectTo: $page.url.href }
		});
	}

	// Define an asynchronous function to handle sign-out
	async function handleSignOut() {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			await invalidateAll();
		}
	}
	// Handle errors from Supabase auth
	onMount(() => {
		// Get the 'error' and 'error_description' parameters from the URL's search params
		const error = $page.url.searchParams.get('error');
		let error_message = $page.url.searchParams.get('error_description');
		// Check if both 'error' and 'error_description' parameters exist
		if (error && error_message) {
			// If both parameters exist, check error
			if (error_message === AUTH_ERROR.DISABLED) {
				error_message = 'Sign up is currently disabled!';
			}
			// Display an error message using the 'toastStore'
			toastStore.trigger({ message: error_message, background: 'variant-filled-error' });
			// Remove query params from url
			goto(data.url);
		}
	});
</script>

{#if session}
	<div class="z-0">
		<!-- trigger -->
		<button
			class="btn group hover:variant-soft-surface"
			use:popup={{ event: 'click', target: 'userMenu' }}
		>
			<Avatar
				src={profile?.avatar ?? ''}
				border="border border-surface-300-600-token group-hover:!border-primary-500"
				cursor="cursor-pointer"
				width="w-8"
				rounded="rounded-full"
			/>
			<span class="md:block hidden">{profile?.username}</span>
			<i class="fa-solid fa-caret-down opacity-50" />
		</button>
		<!-- popup -->
		<div class="card mt-3 p-2 w-52 shadow-xl" data-popup="userMenu">
			<nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
				<ul>
					<li>
						<a class="option w-full h-full" href="/profile">
							<i class="fa-solid fa-id-badge" />
							<span class="capitalize">profile</span></a
						>
					</li>
					<li>
						<button on:click={handleSignOut} class="option w-full h-full" type="submit">
							<i class="fa-solid fa-right-from-bracket" />
							<span class="capitalize">Sign out</span>
						</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
{:else}
	<button on:click={handleDiscordSignIn} type="button" class="btn z-0 variant-filled-primary">
		<i class="fa-solid fa-right-to-bracket" />
		<span class="capitalize font-semibold">Sign in</span>
	</button>
{/if}
