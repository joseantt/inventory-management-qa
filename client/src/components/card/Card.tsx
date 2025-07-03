'use client';

import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { px } from 'framer-motion';
import { FiBox } from 'react-icons/fi';

interface ProductCardProps {
	name: string;
	quantity: number;
	icon?: React.ElementType;
	iconColor?: string;
}

export default function Card({
	name,
	quantity,
	icon = FiBox,
	iconColor = 'turquoise.600',
}: ProductCardProps) {
	return (
		<Flex
			p={4}
			w="fit"
			minW="350px"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				bg={useColorModeValue('white', 'gray.800')}
				maxW="sm"
				w="100%"
				borderWidth="1px"
				rounded="lg"
				shadow="sm"
				position="relative"
				overflow="hidden"
			>
				<Box p={4}>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center">
							<Icon as={icon} h={5} w={5} color={iconColor} mr={3} />
							<Text
								fontSize="md"
								fontWeight="semibold"
								lineHeight="tight"
								noOfLines={1}
							>
								{name}
							</Text>
						</Flex>

						<Flex
							bg="gray.100"
							color="gray.800"
							px={3}
							py={1}
							borderRadius="md"
							fontWeight="bold"
						>
							{quantity}
						</Flex>
					</Flex>
				</Box>
			</Box>
		</Flex>
	);
}
