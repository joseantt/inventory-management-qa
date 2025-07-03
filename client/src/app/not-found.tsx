'use client';

import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react';
import { Routes } from '@/lib/constants/routes.constants';

export default function NotFound() {
	return (
		<main>
			<Flex
				direction="column"
				alignItems="flex-start"
				justifyContent="center"
				flexGrow={1}
				width="100%"
				h="calc(100vh - 187px)"
			>
				<Container maxW={'7xl'}>
					<Stack
						textAlign={'center'}
						align={'center'}
						spacing={{ base: 1 }}
						py={{ base: 1 }}
					>
						<Heading
							display="inline-block"
							as="h2"
							size="2xl"
							bgGradient="linear(to-r, turquoise.600, turquoise.700)"
							backgroundClip="text"
						>
							404
						</Heading>
						<Text fontSize="18px" mt={3} mb={2}>
							Page Not Found
						</Text>
						<Text color={'gray.500'} mb={6}>
							The page you&apos;re looking for does not seem to exist
						</Text>

						<Button
							as={'a'}
							href={Routes.Home}
							colorScheme="turquoise"
							bgGradient="linear(to-r, turquoise.600, turquoise.700, turquoise.600)"
							color="white"
							variant="solid"
						>
							Go to Home
						</Button>
					</Stack>
				</Container>
			</Flex>
		</main>
	);
}
