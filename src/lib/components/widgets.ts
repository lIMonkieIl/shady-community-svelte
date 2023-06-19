import Test1 from './test/test1.svelte';
import Test2 from './test/test2.svelte';
import Test3 from './test/test3.svelte';
import Test4 from './test/test4.svelte';

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
		content: Test1
	},
	{
		id: 2,
		name: 'Mix Table',
		icon: 'fa-list',
		about:
			'This widget is a place to display all ingredients in the mix. Its needed it most cases.',
		image: '/MixTable.png',
		content: Test2
	},
	{
		id: 3,
		name: 'Area Demand',
		icon: 'fa-map-location',
		about: 'This widget allows you to see the areas your mix could be sold.',
		image: '/MixDemand.png',
		content: Test3
	},
	{
		id: 4,
		name: 'Profits/Cost Table',
		icon: 'fa-euro-sign',
		about:
			'This widget allows you to see the potential profit from selling your mix to clients/gangs and the cost of making the mix.',
		image: '/ProfitsTable.png',
		content: Test4
	},
	{
		id: 5,
		name: 'Mix Stats',
		icon: 'fa-chart-simple',
		about: 'This widget allows you to see your mix stats like: Addiction, Str, MixStr, Tox.',
		image: '/MixStats.png',
		content: Test1
	},
	{
		id: 6,
		name: 'Actions',
		icon: 'fa-hand-dots',
		about: 'This widget allows you to do actions like Mix: Saving, Loading, Scaling, Sharing,',
		image: '/Actions.png',
		content: Test2
	},
	{
		id: 7,
		name: 'Crop Planner',
		icon: 'fa-cannabis',
		about: 'This widget allows you to plan your indoor/outdoor crops.',
		image: '/Actions.png',
		content: Test3
	}
];
