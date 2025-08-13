'use client';

import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

interface LoadingScreenProps {
	message?: string;
}

export default function LoadingScreen({
	message = 'Loading...',
}: LoadingScreenProps) {
	return (
		<Flex
			direction="column"
			align="center"
			justify="center"
			minH="100vh"
			bg="gray.50"
		>
			<Box textAlign="center" py={10} px={6}>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="turquoise.500"
					size="xl"
					mb={4}
				/>
				<Text fontSize="xl" fontWeight="medium">
					{message}
				</Text>
			</Box>
		</Flex>
	);
}
