import Actions from '$lib/components/widgets/Actions.svelte';
import AreaDemand from '$lib/components/widgets/AreaDemand.svelte';
import MixStats from '$lib/components/widgets/MixStats.svelte';
import MixTable from '$lib/components/widgets/MixTable/MixTable.svelte';
import Options from '$lib/components/widgets/Options.svelte';
import ProfitsTable from '$lib/components/widgets/ProfitsTable.svelte';
import gridHelp from '../Grid/utils/helper';
import CropPlanner from './CropPlanner.svelte';

export interface Helper {
	fixed: boolean;
	resizable: boolean;
	draggable: boolean;
	customDragger: boolean;
	customResizer: boolean;
	min: {
		w: number;
		h: number;
	};
	max: {
		// Define the properties inside the max object if applicable
		// Example: "x": number, "y": number
	};
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface Collapsed {
	active: boolean;
	w: number;
	h: number;
}

export interface Data {
	name: string;
	icon: string;
	about: string;
	image: string;
	content?: ConstructorOfATypedSvelteComponent;
}

export interface Widget {
	[key: number]: Helper;
	id: number;
	collapsed: Collapsed;
	data: Data;
}
export const widgets: Widget[] = [
	{
		16: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,

			customDragger: true,
			customResizer: true
		}),
		id: 1,
		collapsed: { active: false, w: 0, h: 0 },

		data: {
			name: 'Options',
			icon: 'fa-gears',
			about: 'This widget allows you to set to options. Its needed it most cases.',
			image: '/Options.png'
		}
	},
	{
		16: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,
			customDragger: true,
			customResizer: true
		}),
		id: 2,
		collapsed: { active: false, w: 0, h: 0 },
		data: {
			name: 'Table',
			icon: 'fa-list',
			about:
				'This widget is a place to display all ingredients in the mix. Its needed it most cases.',
			image: '/MixTable.png'
		}
	},
	{
		16: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,

			customDragger: true,
			customResizer: true
		}),
		id: 3,
		collapsed: { active: false, w: 0, h: 0 },
		data: {
			name: 'Area Demand',
			icon: 'fa-map-location',
			about: 'This widget allows you to see the areas your mix could be sold.',
			image: '/MixDemand.png'
		}
	},
	{
		16: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,

			customDragger: true,
			customResizer: true
		}),
		id: 8,
		collapsed: { active: false, w: 0, h: 0 },
		data: {
			name: 'Profits/Cost Table',
			icon: 'fa-euro-sign',
			about:
				'This widget allows you to see the potential profit from selling your mix to clients/gangs and the cost of making the mix.',
			image: '/ProfitsTable.png'
		}
	},
	{
		16: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,

			customDragger: true,
			customResizer: true
		}),
		id: 5,
		collapsed: { active: false, w: 0, h: 0 },
		data: {
			name: 'Stats',
			icon: 'fa-chart-simple',
			about: 'This widget allows you to see your mix stats like: Addiction, Str, MixStr, Tox.',
			image: '/MixStats.png'
		}
	},
	{
		16: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,

			customDragger: true,
			customResizer: true
		}),
		id: 6,
		collapsed: { active: false, w: 0, h: 0 },
		data: {
			name: 'Actions',
			icon: 'fa-hand-dots',
			about: 'This widget allows you to do actions like Mix: Saving, Loading, Scaling, Sharing,',
			image: '/Actions.png'
		}
	},
	{
		16: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,
			customDragger: true,
			customResizer: true
		}),
		id: 7,
		collapsed: { active: false, w: 0, h: 0 },
		data: {
			name: 'Crop Planner',
			icon: 'fa-cannabis',
			about: 'This widget allows you to plan your indoor/outdoor crops.',
			image: '/Actions.png'
		}
	}
];
