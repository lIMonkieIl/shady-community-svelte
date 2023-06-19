<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	const comboBox = [
		{
			id: 1,
			name: 'mix'
		},
		{
			id: 2,
			name: 'pre-mix'
		}
	];
	let comboboxValue: string = comboBox[0].name;

	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<button class="btn w-fit h-fit variant-ghost-primary"
	><i class="fa-solid fa-circle-plus" /><span>Ingredient</span></button
>
<div class="input-group w-fit h-fit input-group-divider grid-cols-[auto_1fr_auto]">
	<input type="search" placeholder="Mix/Pre-mix Name" />
	<button
		class="btn w-28 variant-ghost-primary rounded-l-none justify-between"
		use:popup={popupCombobox}
	>
		<span class="capitalize">{comboboxValue}</span>
		<i class="fa-solid fa-caret-down" />
	</button>
</div>
<div class="card w-28 shadow-xl p-1 overflow-hidden" data-popup="popupCombobox">
	<ListBox rounded={'none'}>
		{#each comboBox as combo (combo.id)}
			{#if combo.name !== comboboxValue}
				<ListBoxItem
					class={'btn capitalize w-full variant-soft-secondary'}
					bind:group={comboboxValue}
					name="medium"
					value={combo.name}>{combo.name}</ListBoxItem
				>
			{/if}
		{/each}
	</ListBox>
</div>
