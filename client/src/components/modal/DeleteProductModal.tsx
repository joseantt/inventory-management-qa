'use client';

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
import { useRef } from 'react';

type DeleteProductModalProps = {
	isOpen: boolean;
	onClose: () => void;
	product: Product | null;
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

	const handleDelete = async () => {
		if (!product) return;

		try {
			if (onDelete) {
				onDelete(product?.id ?? '');
			}

			toast({
				title: 'Product deleted',
				description: `${product.name} has been deleted successfully`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});

			onClose();
		} catch (error) {
			toast({
				title: 'Delete failed',
				description:
					error instanceof Error ? error.message : 'An error occurred',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
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
