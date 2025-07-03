import { NEXT_KEYCLOAK_AUTH_URL } from './config.constants';

export const Routes = {
	Home: '/',
	Login: NEXT_KEYCLOAK_AUTH_URL,
	Inventory: '/inventory',
} as const;

export type RoutesType = (typeof Routes)[keyof typeof Routes];
