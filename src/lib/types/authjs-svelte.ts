import type { Session as AuthSession } from '@auth/core/types';
export interface User {
	id?: number;
	discordId: string | null;
	username: string | null;
	displayName?: string | null;
	email: string | null;
	avatar: string | null;
}
export interface Session extends AuthSession {
	user: User;
}
