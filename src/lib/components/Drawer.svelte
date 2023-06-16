<script lang="ts">
	import { drawerStore, Drawer } from '@skeletonlabs/skeleton';
	import Sidebar from './Sidebar.svelte';
</script>

<Drawer class="">
	{#if $drawerStore.id === 'sidenav'}
		<Sidebar />
	{/if}
</Drawer>
