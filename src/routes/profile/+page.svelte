<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let username: string = profile?.username ?? '';
	let avatar: string = profile?.avatar ?? '';
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
			await invalidateAll();
		};
	};
</script>

<div class="form-widget">
	<form
		enctype="multipart/form-data"
		class="flex flex-col gap-3 justify-start items-center"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div class="flex justify-center gap-3 items-end">
			<label for="username" class="label">
				<span>username</span>
				<input
					bind:value={username}
					class="input"
					type="text"
					name="username"
					id="username"
					placeholder="Input"
				/>
			</label>
			<button
				type="button"
				on:click={() => (username = session.user.user_metadata.full_name)}
				class="btn variant-filled-primary">reset</button
			>
		</div>
		<div class="flex justify-center gap-3 items-end">
			<label for="avatar" class="label">
				<span>avatar</span>
				<input
					name="avatar"
					bind:value={avatar}
					class="input"
					type="text"
					id="avatar"
					placeholder="Input"
				/>
			</label>
			<button
				type="button"
				on:click={() => (avatar = session.user.user_metadata.avatar_url)}
				class="btn variant-filled-primary">reset</button
			>
		</div>

		<input
			type="submit"
			class="btn variant-filled-primary"
			value={loading ? 'Loading...' : 'Update'}
			disabled={loading}
		/>
	</form>
</div>
