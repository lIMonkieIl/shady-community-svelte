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
	import Ingredients from '$lib/data/Ingredients.json';
</script>

<div class="card gap-2 flex flex-col rounded-t-none p-2">
	<div class="w-full text-base flex gap-2 flex-wrap">
		<div class="flex overflow-hidden w-fit h-fit items-center">
			<button
				class="btn w-fit h-fit rounded-r-none variant-ghost-primary"
				use:popup={popupCombobox}
			>
				<span class="capitalize truncate">{comboboxValue}</span>
				<i class="fa-solid fa-caret-down" />
			</button>
			<input
				class="input border-l-0 max-w-fit variant-ghost-primary h-fit w-32 rounded-l-none capitalize"
				type="text"
				placeholder={`name`}
			/>
		</div>
		<!-- Ingr Button -->
		<button class="btn w-fit h-fit variant-ghost-primary"
			><i class="fa-solid fa-circle-plus" /><span>Ingredient</span></button
		>
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
	</div>
	<!-- {#each Ingredients as ingr} -->
	<!-- <div class="flex overflow-hidden"> -->
	<!-- <div
				class="flex gap-2 items-center flex-col p-2 justify-around text-base card variant-ghost-secondary rounded-tr-none rounded-br-none"
			> -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- <div>
					<i class="fa-solid fa-arrows-up-down" />
				</div> -->
	<!-- <button class="hover:scale-125 duration-200 transition-all"
					><i class="fa-solid text-xl fa-trash-alt" /></button
				> -->
	<!-- </div> -->

	<!-- <div class="card variant-ghost-primary rounded-l-none p-2">{ingr.name}</div> -->
	<!-- </div> -->
	<!-- {/each} -->
</div>
