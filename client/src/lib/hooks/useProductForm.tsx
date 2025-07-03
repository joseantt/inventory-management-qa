import { createProduct, updateProduct } from '@lib/actions/products.action';
import { NEXT_PUBLIC_API_URL } from '@lib/constants/config.constants';
import type { Product } from '@lib/model/product.model';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

const API_ULR = NEXT_PUBLIC_API_URL;

type ProductFormErrors = {
	name: boolean;
	description: boolean;
	category: boolean;
	price: boolean;
	quantity: boolean;
};

type UseProductFormProps = {
	mode?: 'create' | 'edit';
	product?: Product;
	onSuccess?: (data: Product) => void;
	onError?: (error: Error) => void;
	token: string;
};

export function useProductForm({
	mode = 'create',
	product,
	onSuccess,
	onError,
	token,
}: UseProductFormProps) {
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

	const createMutation = useSWRMutation(
		`${API_ULR}`,
		(key, { arg }: { arg: Product }) =>
			createProduct({
				url: key,
				product: arg,
				headers: { Authorization: `Bearer ${token}` },
			}),
	);

	const updateMutation = useSWRMutation(
		mode === 'edit' ? `${API_ULR}` : null,
		(key, { arg }: { arg: Product }) =>
			updateProduct({
				url: `${key}/product/${arg.id}`,
				product: arg,
				headers: { Authorization: `Bearer ${token}` },
			}),
	);

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

	const submitForm = async (): Promise<Product | null> => {
		if (!validateForm()) {
			return null;
		}

		try {
			// biome-ignore lint/suspicious/noImplicitAnyLet: n/a
			let result;

			if (mode === 'create') {
				result = await createMutation.trigger(formData);
			}

			if (mode === 'edit' && product) {
				result = await updateMutation.trigger({
					...formData,
					id: product?.id,
				});
			}

			if (onSuccess && result) {
				onSuccess(result);
			}

			return result;
		} catch (error) {
			console.error(
				`Error ${mode === 'create' ? 'creating' : 'updating'} product:`,
				error,
			);

			if (onError && error instanceof Error) {
				onError(error);
			}

			return null;
		}
	};

	const isSubmitting =
		mode === 'create' ? createMutation.isMutating : updateMutation.isMutating;

	return {
		formData,
		errors,
		isSubmitting,
		handleInputChange,
		handleNumberChange,
		setFormData,
		submitForm,
		resetForm,
	};
}
