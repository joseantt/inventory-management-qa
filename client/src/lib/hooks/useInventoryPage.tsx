import { useDisclosure } from '@chakra-ui/react';
import type { Product } from '@lib/model/product.model';
import { useState } from 'react';

export function useInventoryPage() {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const handleEditProduct = (product: Product) => {
		setSelectedProduct(product);
		onEditOpen();
	};

	const handleDeleteProduct = (product: Product) => {
		setSelectedProduct(product);
		onDeleteOpen();
	};

	const handleUpdateProduct = (updatedProduct: Product) => {
		console.log('Product updated:', updatedProduct);
	};

	const handleConfirmDelete = (productId: string) => {
		console.log('Product deleted:', productId);
	};

	return {
		selectedProduct,
		setSelectedProduct,
		handleEditProduct,
		handleDeleteProduct,
		handleUpdateProduct,
		handleConfirmDelete,
		isOpen,
		onOpen,
		onClose,
		isEditOpen,
		onEditOpen,
		onEditClose,
		isDeleteOpen,
		onDeleteOpen,
		onDeleteClose,
	};
}
