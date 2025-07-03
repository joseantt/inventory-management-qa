'use client';

import {
	Button,
	Flex,
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
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';
import SidebarWithHeader from '@components/navigation/sidebar/SidebarWithBanner';
import { useProductForm } from '@lib/hooks/useProductForm';
import Card from '@/components/card/Card';

export const PRODUCT_CATEGORIES = [
	'ELECTRONICS',
	'CLOTHING',
	'FOOD',
	'BOOKS',
	'TOYS',
	'FURNITURE',
	'OTHER',
];

// isOpen, onOpen, onClose;

type AddProductModalProps = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export default function AddProductModal({
	isOpen,
	onOpen,
	onClose,
}: AddProductModalProps) {
	const toast = useToast();

	const {
		formData,
		errors,
		isSubmitting,
		handleInputChange,
		handleNumberChange,
		resetForm,
	} = useProductForm();

	// const handleSubmit = async () => {
	// 	const result = await submitForm();

	// 	if (result) {
	// 		// Mostrar notificación de éxito
	// 		toast({
	// 			title: 'Product created',
	// 			description: `${result.name} has been added to inventory`,
	// 			status: 'success',
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});

	// 		// Cerrar modal y resetear formulario
	// 		handleCloseModal();
	// 	}
	// };

	// Reset form when closing modal
	const handleCloseModal = () => {
		resetForm();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add New Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						{/* Product Name */}
						<FormControl isInvalid={errors.name} isRequired>
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

						{/* Description */}
						<FormControl isInvalid={errors.description} isRequired>
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

						{/* Category */}
						<FormControl isInvalid={errors.category} isRequired>
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

						{/* Price */}
						<FormControl isInvalid={errors.price} isRequired>
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

						{/* Quantity */}
						<FormControl isInvalid={errors.quantity} isRequired>
							<FormLabel>Quantity</FormLabel>
							<NumberInput
								min={1}
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
									Quantity must be at least 1.
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
						// onClick={handleSubmit}
						isLoading={isSubmitting}
						loadingText="Creating..."
					>
						Create Product
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
