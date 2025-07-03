'use client';

import { Button, Flex } from '@chakra-ui/react';
import Card from '@components/card/Card';
import FilterByCategory from '@components/filters/FilterByCategory';
import FilterByMaxAmount from '@components/filters/FilterByMaxAmount';
import FilterByMinAmount from '@components/filters/FilterByMinAmount';
import AddProductModal from '@components/modal/AddProductModal';
import DeleteProductModal from '@components/modal/DeleteProductModal';
import EditProductModal from '@components/modal/EditProductModal';
import SidebarWithHeader from '@components/navigation/sidebar/SidebarWithBanner';
import Pagination from '@components/pagination/Pagination';
import ProductSearch from '@components/search/ProductSearch';
import ProductTable from '@components/table/ProductTable';
import { useInventoryPage } from '@lib/hooks/useInventoryPage';

const products = [
	{
		id: '1',
		name: 'Product 1',
		description: 'Description for product 1',
		category: 'ELECTRONICS',
		price: '100.00',
		quantity: '10',
	},
	{
		id: '2',
		name: 'Product 2',
		description: 'Description for product 2',
		category: 'CLOTHING',
		price: '50.00',
		quantity: '20',
	},
	{
		id: '3',
		name: 'Product 3',
		description: 'Description for product 3',
		category: 'FOOD',
		price: '5.00',
		quantity: '100',
	},
	{
		id: '4',
		name: 'Product 4',
		description: 'Description for product 4',
		category: 'BOOKS',
		price: '15.00',
		quantity: '30',
	},
	{
		id: '5',
		name: 'Product 5',
		description: 'Description for product 5',
		category: 'TOYS',
		price: '25.00',
		quantity: '15',
	},
	{
		id: '6',
		name: 'Product 6',
		description: 'Description for product 6',
		category: 'FURNITURE',
		price: '200.00',
		quantity: '5',
	},
	{
		id: '7',
		name: 'Product 7',
		description: 'Description for product 7',
		category: 'OTHER',
		price: '75.00',
		quantity: '8',
	},
	{
		id: '8',
		name: 'Product 8',
		description: 'Description for product 8',
		category: 'ELECTRONICS',
		price: '120.00',
		quantity: '12',
	},
	{
		id: '9',
		name: 'Product 9',
		description: 'Description for product 9',
		category: 'CLOTHING',
		price: '60.00',
		quantity: '18',
	},
	{
		id: '10',
		name: 'Product 10',
		description: 'Description for product 10',
		category: 'FOOD',
		price: '7.50',
		quantity: '50',
	},
	{
		id: '11',
		name: 'Product 11',
		description: 'Description for product 11',
		category: 'BOOKS',
		price: '20.00',
		quantity: '25',
	},
	{
		id: '12',
		name: 'Product 12',
		description: 'Description for product 12',
		category: 'TOYS',
		price: '30.00',
		quantity: '10',
	},
];

export default function InventoryPage() {
	const {
		selectedProduct,
		handleEditProduct,
		isOpen,
		onOpen,
		onClose,
		isEditOpen,
		onEditClose,
		isDeleteOpen,
		onDeleteClose,
		handleConfirmDelete,
		handleDeleteProduct,
	} = useInventoryPage();

	return (
		<main>
			<SidebarWithHeader>
				<Flex direction="column" gap={4} p={4}>
					<Flex
						direction={{ base: 'column', md: 'row' }}
						justifyContent={{ base: 'center', md: 'space-between' }}
						alignItems="center"
						gap={4}
						p={4}
						flexGrow={1}
						flexWrap="wrap"
					>
						<Flex
							justifyContent="center"
							alignItems="center"
							gap={4}
							flexWrap="wrap"
							mb={{ base: 4, md: 0 }}
						>
							<Card name="Total Products" quantity={0} />
							<Card name="Total Products" quantity={0} />
						</Flex>
						<Flex justifyContent="center" alignItems="center">
							<Button
								fontSize={'sm'}
								fontWeight={600}
								color={'white'}
								onClick={onOpen}
								bg={'turquoise.700'}
								_hover={{
									bg: 'turquoise.600',
								}}
								w={{ base: '100%', md: 'auto' }}
							>
								Add Product
							</Button>
						</Flex>
					</Flex>
					<Flex
						direction={{ base: 'column', md: 'row' }}
						gap={4}
						w="100%"
						align={{ base: 'stretch', md: 'flex-end' }}
					>
						<Flex flex={{ base: '1', md: '1' }}>
							<ProductSearch />
						</Flex>

						<Flex
							direction={{ base: 'column', md: 'row' }}
							gap={3}
							flex="1"
							align="stretch"
							justify={{ base: 'flex-start', md: 'flex-end' }}
						>
							<FilterByMinAmount />
							<FilterByMaxAmount />
							<FilterByCategory />
						</Flex>
					</Flex>
					<ProductTable
						products={products}
						onEdit={handleEditProduct}
						onDelete={handleDeleteProduct}
						isLoading={false}
					/>
					<Pagination
						total={products.length}
						colorScheme={'orange'}
						perPage={1}
					/>
				</Flex>
				<AddProductModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
				<EditProductModal
					isOpen={isEditOpen}
					onClose={onEditClose}
					product={selectedProduct}
					onUpdate={handleEditProduct}
				/>
				<DeleteProductModal
					isOpen={isDeleteOpen}
					onClose={onDeleteClose}
					product={selectedProduct}
					onDelete={handleConfirmDelete}
				/>
			</SidebarWithHeader>
		</main>
	);
}
