'use client';

import {
	Skeleton,
	SkeletonText,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';

interface ProductTableSkeletonProps {
	rowCount?: number;
}

export default function ProductTableSkeleton({
	rowCount = 5,
}: ProductTableSkeletonProps) {
	return (
		<TableContainer w="100%">
			<Table size="md">
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Description</Th>
						<Th>Category</Th>
						<Th isNumeric>Price</Th>
						<Th isNumeric>Quantity</Th>
						<Th textAlign="center">Actions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{Array(rowCount)
						.fill(0)
						.map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<Tr key={index}>
								<Td>
									<Skeleton height="20px" width="120px" />
								</Td>
								<Td>
									<SkeletonText noOfLines={2} spacing="2" width="250px" />
								</Td>
								<Td>
									<Skeleton height="24px" width="100px" borderRadius="full" />
								</Td>
								<Td isNumeric>
									<Skeleton height="20px" width="80px" ml="auto" />
								</Td>
								<Td isNumeric>
									<Skeleton
										height="24px"
										width="50px"
										borderRadius="full"
										ml="auto"
									/>
								</Td>
								<Td>
									<Stack direction="row" spacing={2} justifyContent="center">
										<Skeleton height="32px" width="32px" borderRadius="md" />
										<Skeleton height="32px" width="32px" borderRadius="md" />
										<Skeleton height="32px" width="32px" borderRadius="md" />
									</Stack>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
