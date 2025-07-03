'use client';

import {
	Badge,
	Box,
	Flex,
	IconButton,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
} from '@chakra-ui/react';
import ProductTableSkeleton from '@components/skeletons/TableSkeleton';
import { useProductTable } from '@lib/hooks/useProductTable';
import type { Product } from '@lib/model/product.model';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface ProductTableProps {
	products: Product[];
	onEdit?: (product: Product) => void;
	onDelete?: (product: Product) => void;
	isLoading?: boolean;
}

export default function ProductTable({
	products,
	onEdit,
	onDelete,
	isLoading = false,
}: ProductTableProps) {
	const { tableData, getCategoryColor, formatPrice, isEmpty } = useProductTable(
		{ products, isLoading },
	);

	if (isLoading) {
		return <ProductTableSkeleton rowCount={5} />;
	}

	if (isEmpty) {
		return (
			<Box p={4} textAlign="center">
				<Text>No products found. Add a product to get started.</Text>
			</Box>
		);
	}

	return (
		<TableContainer w="100%" bg="white" borderRadius="md" boxShadow="md">
			<Table size="md">
				<TableCaption placement="top">Inventory Products</TableCaption>
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
					{tableData.map((product, index) => (
						<Tr key={product.id || index}>
							<Td fontWeight="semibold">{product.name}</Td>
							<Td maxW="300px" isTruncated title={product.description}>
								{product.description}
							</Td>
							<Td>
								<Badge colorScheme={getCategoryColor(product.category)}>
									{product.category}
								</Badge>
							</Td>
							<Td isNumeric>{formatPrice(product.price)}</Td>
							<Td isNumeric>
								<Badge
									colorScheme={Number(product.quantity) > 0 ? 'green' : 'red'}
									variant="solid"
									borderRadius="full"
									px={2}
								>
									{product.quantity}
								</Badge>
							</Td>
							<Td>
								<Flex justifyContent="center" gap={2}>
									{onEdit && (
										<Tooltip label="Edit Product">
											<IconButton
												aria-label="Edit product"
												icon={<FiEdit2 />}
												size="sm"
												colorScheme="teal"
												variant="ghost"
												onClick={() => onEdit(product)}
											/>
										</Tooltip>
									)}
									{onDelete && (
										<Tooltip label="Delete Product">
											<IconButton
												aria-label="Delete product"
												icon={<FiTrash2 />}
												size="sm"
												colorScheme="red"
												variant="ghost"
												onClick={() => onDelete(product)}
											/>
										</Tooltip>
									)}
								</Flex>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
