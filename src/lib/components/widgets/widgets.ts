import Actions from './Actions.svelte';
import AreaDemand from './AreaDemand.svelte';
import CropPlanner from './CropPlanner.svelte';
import MixStats from './MixStats.svelte';
import MixTable from './MixTable.svelte';
import Options from './Options.svelte';
import ProfitsTable from './ProfitsTable.svelte';

export interface Widget {
	id: number;
	name: string;
	icon: string;
	about: string;
	image: string;
	content: ConstructorOfATypedSvelteComponent;
}

export const widgets: Widget[] = [
	{
		id: 1,
		name: 'Options',
		icon: 'fa-gears',
		about: 'This widget allows you to set to options. Its needed it most cases.',
		image: '/Options.png',
		content: Options
	},
	{
		id: 2,
		name: 'Mix Table',
		icon: 'fa-list',
		about:
			'This widget is a place to display all ingredients in the mix. Its needed it most cases.',
		image: '/MixTable.png',
		content: MixTable
	},
	{
		id: 3,
		name: 'Area Demand',
		icon: 'fa-map-location',
		about: 'This widget allows you to see the areas your mix could be sold.',
		image: '/MixDemand.png',
		content: AreaDemand
	},
	{
		id: 4,
		name: 'Profits/Cost Table',
		icon: 'fa-euro-sign',
		about:
			'This widget allows you to see the potential profit from selling your mix to clients/gangs and the cost of making the mix.',
		image: '/ProfitsTable.png',
		content: ProfitsTable
	},
	{
		id: 5,
		name: 'Mix Stats',
		icon: 'fa-chart-simple',
		about: 'This widget allows you to see your mix stats like: Addiction, Str, MixStr, Tox.',
		image: '/MixStats.png',
		content: MixStats
	},
	{
		id: 6,
		name: 'Actions',
		icon: 'fa-hand-dots',
		about: 'This widget allows you to do actions like Mix: Saving, Loading, Scaling, Sharing,',
		image: '/Actions.png',
		content: Actions
	},
	{
		id: 7,
		name: 'Crop Planner',
		icon: 'fa-cannabis',
		about: 'This widget allows you to plan your indoor/outdoor crops.',
		image: '/Actions.png',
		content: CropPlanner
	}
];
