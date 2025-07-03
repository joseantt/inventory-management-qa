export const NEXT_API_URL =
	process.env.NEXT_API_URL ?? 'http://localhost:8080/api/v1';

export const NEXT_KEYCLOAK_URL =
	process.env.NEXT_KEYCLOAK_URL ?? 'http://localhost:7080';

export const NEXT_KEYCLOAK_AUTH_URL: string =
	process.env.NEXT_KEYCLOAK_AUTH_URL ??
	'http://localhost:7080/realms/inventory-realm/account';

export const NEXT_KEYCLOAK_REALM =
	process.env.NEXT_KEYCLOAK_REALM ?? 'inventory-realm';

export const NEXT_KEYCLOAK_CLIENT_ID =
	process.env.NEXT_KEYCLOAK_CLIENT_ID ?? 'inventory-frontend';
