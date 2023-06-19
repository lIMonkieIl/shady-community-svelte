<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Avatar, LightSwitch, popup } from '@skeletonlabs/skeleton';
</script>

{#if $page.data.session}
	<div>
		<!-- trigger -->
		<button
			class="btn group hover:variant-soft-surface"
			use:popup={{ event: 'click', target: 'userMenu' }}
		>
			<Avatar
				src={$page.data.session.user?.image ?? ''}
				border="border border-surface-300-600-token group-hover:!border-primary-500"
				cursor="cursor-pointer"
				width="w-8"
				rounded="rounded-full"
			/>
			<span class="md:block hidden">{$page.data.session.user?.name}</span>
			<i class="fa-solid fa-caret-down opacity-50" />
		</button>
		<!-- popup -->
		<div class="card mt-3 p-2 w-52 shadow-xl" data-popup="userMenu">
			<nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
				<ul>
					<li>
						<button
							on:click={() => signOut()}
							class="option w-full h-full"
							type="submit"
							name="theme"
						>
							<i class="fa-solid fa-right-from-bracket" />
							<span class="capitalize">Sign out</span>
						</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
{:else}
	<button on:click={() => signIn('discord')} type="button" class="btn variant-filled-primary">
		<i class="fa-solid fa-right-to-bracket" />
		<span class="capitalize font-semibold">Sign in</span>
	</button>
{/if}
