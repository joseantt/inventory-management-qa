import type { Product } from '@lib/model/product.model';
import { useState } from 'react';

type ProductFormErrors = {
	name: boolean;
	description: boolean;
	category: boolean;
	price: boolean;
	quantity: boolean;
};

export function useProductForm() {
	const [formData, setFormData] = useState<Product>({
		name: '',
		description: '',
		category: '',
		price: '0',
		quantity: '0',
	});

	const [errors, setErrors] = useState<ProductFormErrors>({
		name: false,
		description: false,
		category: false,
		price: false,
		quantity: false,
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name as keyof ProductFormErrors]) {
			setErrors((prev) => ({
				...prev,
				[name]: false,
			}));
		}
	};

	const handleNumberChange = (name: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name as keyof ProductFormErrors]) {
			setErrors((prev) => ({
				...prev,
				[name]: false,
			}));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: ProductFormErrors = {
			name: formData.name.trim() === '',
			description: formData.description.trim() === '',
			category: formData.category === '',
			price: Number.parseFloat(formData.price) <= 0,
			quantity: Number.parseInt(formData.quantity) <= 0,
		};

		setErrors(newErrors);
		return !Object.values(newErrors).some((error) => error);
	};

	// // Enviar formulario
	// const submitForm = async (): Promise<ProductFormData | null> => {
	// 	if (validateForm()) {
	// 		setIsSubmitting(true);

	// 		try {
	// 			// Aquí es donde normalmente harías la llamada a la API
	// 			// Por ahora, simplemente devolvemos los datos formateados
	// 			const productData = {
	// 				name: formData.name,
	// 				description: formData.description,
	// 				category: formData.category,
	// 				price: formData.price,
	// 				quantity: formData.quantity,
	// 			};

	// 			// Simular retraso de red
	// 			await new Promise((resolve) => setTimeout(resolve, 500));

	// 			return productData;
	// 		} catch (error) {
	// 			console.error('Error submitting form:', error);
	// 			return null;
	// 		} finally {
	// 			setIsSubmitting(false);
	// 		}
	// 	}

	// 	return null;
	// };

	const resetForm = () => {
		setFormData({
			name: '',
			description: '',
			category: '',
			price: '0',
			quantity: '0',
		});

		setErrors({
			name: false,
			description: false,
			category: false,
			price: false,
			quantity: false,
		});
	};

	return {
		formData,
		errors,
		isSubmitting,
		handleInputChange,
		handleNumberChange,
		setFormData,
		validateForm,
		resetForm,
	};
}
