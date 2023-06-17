/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { SvelteKitAuth } from '@auth/sveltekit';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';

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
					id: String(profile.id),
					name: String(profile.username),
					discriminator: String(profile.discriminator),
					email: profile.email,
					image: String(profile.image_url)
				};
			}
		}
	],
	session: {
		strategy: 'jwt',
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60 // 24 hours
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			if (user) {
				token.email = user.email;
				token.name = user.name;
				token.picture = user.image;
				token.sub = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			/**
			 *
			 */
			session.user = {
				email: token.email,
				image: token.picture,
				name: token.name,
				id: token.sub
			};
			return session;
		}
	}
});
