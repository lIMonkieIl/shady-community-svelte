<script lang="ts">
	import { updated } from '$app/stores';
	import { type ToastSettings, toastStore } from '@skeletonlabs/skeleton';
	const updatedToast: ToastSettings = {
		message: 'A new update is available',
		autohide: false,
		background: 'variant-filled-warning'
	};
	if ($updated) {
		toastStore.trigger(updatedToast);
	}
</script>

<span>hello</span>
