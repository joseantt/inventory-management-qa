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
import LoadingScreen from '@/components/loading/LoadingScreen';

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
		products,
		isLoading,
		isAuthChecking,
	} = useInventoryPage();

	if (isAuthChecking) {
		return <LoadingScreen />;
	}

	return (
		<main>
			<SidebarWithHeader>
				<Flex direction="column" gap={4}>
					<Flex
						direction={{ base: 'column', md: 'row' }}
						justifyContent={{ base: 'center', md: 'space-between' }}
						alignItems="center"
						gap={4}
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
							<Card name="Total Products" quantity={products.totalElements} />
							{/* <Card name="Out Of Stock" quantity={0} /> */}
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
						products={products.content}
						onEdit={handleEditProduct}
						onDelete={handleDeleteProduct}
						isLoading={isLoading}
					/>
					<Pagination
						total={products.totalElements}
						colorScheme={'orange'}
						perPage={products.pageSize}
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
