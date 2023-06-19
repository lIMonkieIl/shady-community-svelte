<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { popup, LightSwitch } from '@skeletonlabs/skeleton';
	import { customThemes, skeletonThemes, storeTheme } from '$lib/stores/storeTheme';
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
</script>

<!-- Theme -->
<div>
	<!-- trigger -->
	<button class="btn-icon variant-filled-primary" use:popup={{ event: 'click', target: 'theme' }}>
		<i class="fa-solid fa-palette text-lg" />
		<!-- <span class="hidden md:inline-block">Theme</span> -->
		<!-- <i class="fa-solid fa-caret-down opacity-50" /> -->
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
									id="tools-close"
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
