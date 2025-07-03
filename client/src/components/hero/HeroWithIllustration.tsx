'use client';

import {
	Button,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useKeycloak } from '@react-keycloak/web';
import { useMemo } from 'react';
import { Routes } from '@/lib/constants/routes.constants';
import Illustration from './illustration/Illustration';

export default function HeroWithIllustration() {
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

	return (
		<Container maxW={'7xl'}>
			<Stack
				textAlign={'center'}
				align={'center'}
				spacing={{ base: 8 }}
				py={{ base: 2 }}
			>
				<Flex w={'full'}>
					<Illustration height={300} />
				</Flex>
				<Heading
					fontWeight={600}
					fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
					lineHeight={'110%'}
				>
					Manage inventory{' '}
					<Text as={'span'} color={'turquoise.700'}>
						made easy
					</Text>
				</Heading>
				<Text color={'gray.500'} maxW={'3xl'}>
					An inventory management system that helps you keep track of your
					products, suppliers, and customers. It is designed to be easy to use
					and flexible.
				</Text>
				<Stack spacing={6} direction={'row'}>
					{isAuthenticated && hasPermission && (
						<Button
							as={'a'}
							href={Routes.Inventory}
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'sm'}
							colorScheme={'white'}
							bg={'turquoise.700'}
							_hover={{
								bg: 'turquoise.600',
							}}
						>
							Go to Inventory
						</Button>
					)}
					{!isAuthenticated && (
						<Button
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'sm'}
							colorScheme={'white'}
							bg={'turquoise.700'}
							onClick={() => {
								keycloak.login({
									redirectUri: window.location.origin + Routes.Inventory,
								});
							}}
							_hover={{
								bg: 'turquoise.600',
							}}
						>
							Go to Inventory
						</Button>
					)}
					{isAuthenticated && !hasPermission && (
						<Button
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'sm'}
							colorScheme={'white'}
							bg={'turquoise.700'}
							_hover={{
								bg: 'turquoise.600',
							}}
						>
							Welcome
						</Button>
					)}
				</Stack>
			</Stack>
		</Container>
	);
}
