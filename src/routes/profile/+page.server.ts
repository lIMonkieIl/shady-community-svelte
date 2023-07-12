import { invalidate } from '$app/navigation';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { error, data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.single();
	return { session, profile };
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const avatar = formData.get('avatar') as string;
		const session = await getSession();

		const { error } = await supabase
			.from('profiles')
			.update({ username, avatar })
			.eq('id', session?.user.id ?? '');

		if (error) {
			return fail(500, {
				success: false,
				username,
				avatar
			});
		}
		return {
			success: true,
			username,
			avatar
		};
	}
};
