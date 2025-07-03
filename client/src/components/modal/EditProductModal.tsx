'use client';

import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useInventoryPage } from '@lib/hooks/useInventoryPage';
import { useProductForm } from '@lib/hooks/useProductForm';
import type { Product } from '@lib/model/product.model';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';

export const PRODUCT_CATEGORIES = [
	'ELECTRONICS',
	'CLOTHING',
	'FOOD',
	'BOOKS',
	'TOYS',
	'FURNITURE',
	'OTHER',
];

type EditProductModalProps = {
	isOpen: boolean;
	onClose: () => void;
	product: Product | undefined;
	onUpdate?: (updatedProduct: Product) => void;
};

export default function EditProductModal({
	isOpen,
	onClose,
	product,
	onUpdate,
}: EditProductModalProps) {
	const toast = useToast();
	const { keycloak } = useKeycloak();
	const { refreshProducts } = useInventoryPage();

	const {
		formData,
		setFormData,
		errors,
		isSubmitting,
		handleInputChange,
		handleNumberChange,
		resetForm,
		submitForm,
	} = useProductForm({
		mode: 'edit',
		product: product,
		token: keycloak.token ?? '',
		onSuccess: (data) => {
			toast({
				title: 'Product updated',
				description: `${data.name} has been updated successfully`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});

			refreshProducts();

			if (onUpdate) {
				onUpdate(data);
			}

			handleCloseModal();
		},
		onError: (error) => {
			toast({
				title: 'Update failed',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		},
	});

	useEffect(() => {
		if (isOpen && product) {
			setFormData({
				name: product.name,
				description: product.description,
				category: product.category,
				price: product.price,
				quantity: product.quantity,
			});
		}
	}, [isOpen, product, setFormData]);

	const handleSubmit = async () => {
		await submitForm();
	};

	const handleCloseModal = () => {
		resetForm();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<FormControl isInvalid={!!errors.name} isRequired>
							<FormLabel>Product Name</FormLabel>
							<Input
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								placeholder="Enter product name"
							/>
							{errors.name && (
								<FormErrorMessage>Product name is required.</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!errors.description} isRequired>
							<FormLabel>Description</FormLabel>
							<Textarea
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								placeholder="Enter product description"
								resize="vertical"
							/>
							{errors.description && (
								<FormErrorMessage>Description is required.</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!errors.category} isRequired>
							<FormLabel>Category</FormLabel>
							<Select
								name="category"
								value={formData.category}
								onChange={handleInputChange}
								placeholder="Select category"
							>
								{PRODUCT_CATEGORIES.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</Select>
							{errors.category && (
								<FormErrorMessage>Please select a category.</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!errors.price} isRequired>
							<FormLabel>Price</FormLabel>
							<NumberInput
								min={0.01}
								precision={2}
								value={formData.price}
								onChange={(value) => handleNumberChange('price', value)}
							>
								<NumberInputField name="price" />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
							{errors.price && (
								<FormErrorMessage>
									Price must be greater than 0.
								</FormErrorMessage>
							)}
						</FormControl>

						<FormControl isInvalid={!!errors.quantity} isRequired>
							<FormLabel>Quantity</FormLabel>
							<NumberInput
								min={0}
								value={formData.quantity}
								onChange={(value) => handleNumberChange('quantity', value)}
							>
								<NumberInputField name="quantity" />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
							{errors.quantity && (
								<FormErrorMessage>
									Quantity must be a valid number.
								</FormErrorMessage>
							)}
						</FormControl>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button variant="ghost" mr={3} onClick={handleCloseModal}>
						Cancel
					</Button>
					<Button
						bg={'turquoise.700'}
						color={'white'}
						_hover={{
							bg: 'turquoise.600',
						}}
						onClick={handleSubmit}
						isLoading={isSubmitting}
						loadingText="Updating..."
					>
						Update Product
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
