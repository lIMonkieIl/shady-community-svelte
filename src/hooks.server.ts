import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import type { User } from '$lib/types/authjs-svelte';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const handle = SvelteKitAuth({
	providers: [
		{
			id: 'discord',
			name: 'Discord',
			type: 'oauth',
			authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email',
			token: 'https://discord.com/api/oauth2/token',
			userinfo: 'https://discord.com/api/users/@me',
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET,

			profile(profile) {
				if (profile.avatar === null || profile.avatar === undefined) {
					const defaultAvatarNumber = parseInt(String(profile.discriminator)) % 5;
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
				} else {
					const format = String(profile.avatar).startsWith('a_') ? 'gif' : 'png';
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
				}
				return {
					id: profile.id as string,
					discordId: profile.id as string,
					username: profile.username as string,
					email: profile.email as string,
					emailVerified: profile.email_verified,
					avatar: profile.image_url as string
				};
			}
		}
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'database',
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60 // 24 hours
	},
	callbacks: {
		async session({ session, user, newSession, trigger }) {
			const myUser = user as unknown as User;
			const sessionUser = {
				discordId: myUser.discordId,
				username: myUser.username,
				email: myUser.email,
				avatar: myUser.avatar,
				displayName: myUser.displayName
			};
			session.user = sessionUser;
			return session;
		}
	}
});
