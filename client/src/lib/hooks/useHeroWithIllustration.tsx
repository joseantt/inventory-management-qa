import { useKeycloak } from '@react-keycloak/web';
import { useCallback, useMemo } from 'react';
import { Routes } from '@/lib/constants/routes.constants';

export default function useHeroWithIllustration() {
	const { keycloak } = useKeycloak();

	const isAuthenticated = useMemo(() => {
		return keycloak.authenticated;
	}, [keycloak.authenticated]);

	const hasPermission = useMemo(() => {
		if (!keycloak.resourceAccess) return false;

		const inventoryBackend = keycloak.resourceAccess['inventory-backend'];
		if (!inventoryBackend || !inventoryBackend.roles) return false;

		return (
			inventoryBackend.roles.includes('admin') ||
			inventoryBackend.roles.includes('employee')
		);
	}, [keycloak.resourceAccess]);

	const goToLogin = useCallback(() => {
		keycloak.login({
			redirectUri: window.location.origin + Routes.Inventory,
		});
	}, [keycloak.login]);

	return {
		isAuthenticated,
		hasPermission,
		goToLogin,
	};
}
