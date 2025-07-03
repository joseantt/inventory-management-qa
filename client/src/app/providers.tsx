'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { useKeycloak } from '@lib/hooks/useKeycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import theme from '../styles/customTheme';

export function Providers({ children }: { children: React.ReactNode }) {
	const { keycloak, initOptions } = useKeycloak();

	return (
		<ChakraProvider theme={theme}>
			<ReactKeycloakProvider
				authClient={keycloak}
				initOptions={initOptions}
				onEvent={(event, error) => {
					console.log('[Keycloak event]', event, error);
				}}
			>
				{children}
			</ReactKeycloakProvider>
		</ChakraProvider>
	);
}
