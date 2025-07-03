'use client';

import { useDeleteProduct } from '@lib/hooks/useDeleteModal';
import { useInventoryPage } from '@lib/hooks/useInventoryPage';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useToast,
} from '@chakra-ui/react';
import type { Product } from '@lib/model/product.model';
import { useKeycloak } from '@react-keycloak/web';
import { useRef } from 'react';

type DeleteProductModalProps = {
	isOpen: boolean;
	onClose: () => void;
	product: Product | undefined;
	onDelete?: (productId: string) => void;
};

export default function DeleteProductModal({
	isOpen,
	onClose,
	product,
	onDelete,
}: DeleteProductModalProps) {
	const toast = useToast();
	const cancelRef = useRef<HTMLButtonElement>(null);
	const { refreshProducts } = useInventoryPage();
	const { keycloak } = useKeycloak();

	const isAdmin =
		keycloak.resourceAccess?.['inventory-backend']?.roles?.includes('admin') ||
		false;

	const { deleteProductById, isDeleting } = useDeleteProduct({
		isAdmin,
		onSuccess: (productId) => {
			if (product) {
				toast({
					title: 'Product deleted',
					description: `${product.name} has been deleted successfully`,
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			}

			refreshProducts();

			if (onDelete) {
				onDelete(productId);
			}

			onClose();
		},
		// biome-ignore lint/suspicious/noExplicitAny: n/a
		onError: (error: any) => {
			toast({
				title: 'Delete failed',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		},
		token: keycloak.token ?? '',
	});

	const handleDelete = async () => {
		if (!product || !product.id) return;

		await deleteProductById(product.id);
	};

	if (!product) return null;

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Delete Product
					</AlertDialogHeader>

					<AlertDialogBody>
						Are you sure you want to delete <strong>{product.name}</strong>?
						This action cannot be undone.
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							onClick={handleDelete}
							isLoading={isDeleting}
							isDisabled={!isAdmin}
							ml={3}
							_hover={{
								bg: 'red.500',
							}}
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}
