import gridHelp from '../Grid/utils/helper';

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
		y: number;
		x: number;
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
export enum STATUS {
	BETA = 'beta',
	INACTIVE = 'inactive',
	ACTIVE = 'active',
	COMING_SOON = 'coming_soon'
}
export interface Data {
	status: STATUS;
	name: string;
	icon: string;
	about: string;
	image: string;
	helper: string[] | null;
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
			status: STATUS.COMING_SOON,
			name: 'Options',
			icon: 'fa-gears',
			about: 'This widget allows you to set to options. Its needed it most cases.',
			image: '/Options.png',
			helper: null
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
			status: STATUS.BETA,
			name: 'Table',
			icon: 'fa-list',
			helper: ['click the ingredient cards to see more information'],
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
			helper: null,
			status: STATUS.COMING_SOON,
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
			status: STATUS.COMING_SOON,
			name: 'Profits/Cost Table',
			icon: 'fa-euro-sign',
			helper: null,
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
			helper: null,
			status: STATUS.COMING_SOON,
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
			helper: null,
			status: STATUS.COMING_SOON,
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
			helper: null,
			status: STATUS.BETA,
			name: 'Crop Planner',
			icon: 'fa-cannabis',
			about: 'This widget allows you to plan your indoor/outdoor crops.',
			image: '/Actions.png'
		}
	}
];
