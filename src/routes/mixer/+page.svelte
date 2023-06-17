<script lang="ts">
	import { Accordion, AccordionItem, popup } from '@skeletonlabs/skeleton';

	const widgets = [
		{
			name: 'Options',
			icon: 'fa-gears',
			content: 'This widget allows you to set to options. Its needed it most cases.',
			image: '/Options.png'
		},
		{
			name: 'Mix Table',
			icon: 'fa-list',
			content:
				'This widget is a place to display all ingredients in the mix. Its needed it most cases.',
			image: '/MixTable.png'
		},
		{
			name: 'Area Demand',
			icon: 'fa-map-location',
			content: 'This widget allows you to see the areas your mix could be sold.',
			image: '/MixDemand.png'
		},
		{
			name: 'Profits/Cost Table',
			icon: 'fa-euro-sign',
			content:
				'This widget allows you to see the potential profit from selling your mix to clients/gangs and the cost of making the mix.',
			image: '/ProfitsTable.png'
		},
		{
			name: 'Mix Stats',
			icon: 'fa-chart-simple',
			content: 'This widget allows you to see your mix stats like: Addiction, Str, MixStr, Tox.',
			image: '/MixStats.png'
		},
		{
			name: 'Actions',
			icon: 'fa-hand-dots',
			content: 'This widget allows you to do actions like Mix: Saving, Loading, Scaling, Sharing,',
			image: '/Actions.png'
		}
	];
</script>

<!-- popup trigger -->
<div class="p-2">
	<button
		use:popup={{ event: 'click', target: 'widgets-panel', closeQuery: '#will-close' }}
		class="btn variant-ghost-primary"
	>
		<i class="fa-solid fa-toolbox" />
		<span>Widgets</span>
		<i class="fa-solid fa-caret-down" />
	</button>
	<!-- popup -->
	<div class="overflow-x-scroll p-4 h-3/4 w-60 card shadow-xl" data-popup="widgets-panel">
		<Accordion class={'card mb-4 variant-ghost-secondary'}>
			<AccordionItem>
				<svelte:fragment slot="lead"><i class={`fa-solid fa-info-circle`} /></svelte:fragment>
				<svelte:fragment slot="summary">How To</svelte:fragment>
				<svelte:fragment slot="content">
					<span
						>Just select a widget to add it to your mix board then arrange them in any order or
						layout by just dragging them around the mix board.</span
					></svelte:fragment
				>
			</AccordionItem>
			<!-- ... -->
		</Accordion>
		{#each widgets as widget}
			<div
				id="will-close"
				class="block overflow-hidden variant-ghost-primary card card-hover mb-4 cursor-pointer"
			>
				<section class="overflow-hidden w-fit">
					<img
						src={widget.image}
						class="h-20 rounded-container-token p-1 w-full object-cover"
						alt=""
					/>
					<div class="p-2">
						<i class={`fa-solid ${widget.icon}`} />
						<span class="font-semibold">{widget.name}</span>
						<div class="p-2">
							<span>{widget.content}</span>
						</div>
					</div>
				</section>
			</div>
		{/each}
	</div>
</div>
