<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page}
	<div class="w-full h-full flex justify-center items-center">
		<div class="text-center space-y-4">
			<!--TODO place logo-->
			<h2 class="h2">
				{$page.status}:{#if $page.error} {$page.error.message} {/if}
			</h2>
			<p>We're sorry, something went wrong.</p>
			<button
				on:click={() => window.history.back()}
				class="btn variant-filled-primary font-semibold">Go Back</button
			>
			<a
				href="/"
				on:click={() => window.history.back()}
				class="btn variant-ghost-primary font-semibold">Go Home</a
			>
		</div>
	</div>
{/if}
