'use client';

import {
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { usePagination } from '@/lib/hooks/usePagination';

interface PaginationProps {
	total: number;
	perPage?: number;
	colorScheme?: string;
	siblingsCount?: number;
}

export default function Pagination({
	total,
	perPage = 10,
	colorScheme = 'turquoise',
	siblingsCount = 1,
}: PaginationProps) {
	const {
		currentPage,
		totalPages,
		nextPages,
		previousPages,
		goToPage,
		goToNextPage,
		goToPreviousPage,
	} = usePagination({
		totalRegisters: total,
		registersPerPage: perPage,
		siblingsCount,
	});

	const isMobileVersion = useBreakpointValue({
		base: true,
		sm: false,
	});

	if (totalPages <= 1) {
		return null;
	}

	return (
		<Flex
			direction={['column', 'row']}
			mt="8"
			justify="space-between"
			align="center"
			w="100%"
		>
			<Box>
				<strong>{(currentPage - 1) * perPage + 1}</strong> -{' '}
				<strong>{Math.min(currentPage * perPage, total)}</strong> of{' '}
				<strong>{total}</strong>
			</Box>

			<HStack spacing="2" mt={['4', '0']}>
				<Button
					size="sm"
					fontSize="xs"
					width="4"
					colorScheme={colorScheme}
					disabled={currentPage === 1}
					onClick={goToPreviousPage}
					variant="outline"
				>
					<Icon as={FiChevronLeft} />
				</Button>

				{!isMobileVersion && currentPage > 1 + siblingsCount && (
					<>
						<Button
							size="sm"
							fontSize="xs"
							width="4"
							onClick={() => goToPage(1)}
							colorScheme={colorScheme}
							variant="outline"
						>
							1
						</Button>
						{currentPage > 2 + siblingsCount && (
							<Text color="gray.300" width="8" textAlign="center">
								...
							</Text>
						)}
					</>
				)}

				{previousPages.length > 0 &&
					previousPages.map((page) => (
						<Button
							key={page}
							size="sm"
							fontSize="xs"
							width="4"
							onClick={() => goToPage(page)}
							colorScheme={colorScheme}
							variant="outline"
						>
							{page}
						</Button>
					))}

				<Button
					size="sm"
					fontSize="xs"
					width="4"
					colorScheme={colorScheme}
					disabled
					variant="solid"
				>
					{currentPage}
				</Button>

				{nextPages.length > 0 &&
					nextPages.map((page) => (
						<Button
							key={page}
							size="sm"
							fontSize="xs"
							width="4"
							onClick={() => goToPage(page)}
							colorScheme={colorScheme}
							variant="outline"
						>
							{page}
						</Button>
					))}

				{!isMobileVersion && currentPage + siblingsCount < totalPages && (
					<>
						{currentPage + 1 + siblingsCount < totalPages && (
							<Text color="gray.300" width="8" textAlign="center">
								...
							</Text>
						)}
						<Button
							size="sm"
							fontSize="xs"
							width="4"
							onClick={() => goToPage(totalPages)}
							colorScheme={colorScheme}
							variant="outline"
						>
							{totalPages}
						</Button>
					</>
				)}

				<Button
					size="sm"
					fontSize="xs"
					width="4"
					colorScheme={colorScheme}
					disabled={currentPage === totalPages}
					onClick={goToNextPage}
					variant="outline"
				>
					<Icon as={FiChevronRight} />
				</Button>
			</HStack>
		</Flex>
	);
}
