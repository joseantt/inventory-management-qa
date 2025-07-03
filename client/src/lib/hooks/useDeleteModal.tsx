import { deleteProduct } from '@lib/actions/products.action';
import type { Product } from '@lib/model/product.model';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { NEXT_PUBLIC_API_URL } from '../constants/config.constants';

const API_URL = `${NEXT_PUBLIC_API_URL}/product`;

type UseDeleteProductProps = {
	isAdmin?: boolean;
	onSuccess?: (productId: string) => void;
	onError?: (error: Error) => void;
	token: string;
};

export function useDeleteProduct({
	isAdmin = false,
	onSuccess,
	onError,
	token,
}: UseDeleteProductProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteMutation = useSWRMutation(
		API_URL,
		(key, { arg }: { arg: string }) =>
			deleteProduct({
				url: key,
				productId: arg,
				product: {} as Product,
				headers: { Authorization: `Bearer ${token}` },
			}),
	);

	const deleteProductById = async (productId: string): Promise<boolean> => {
		if (!isAdmin) {
			const error = new Error('You do not have permission to delete products');
			if (onError) onError(error);
			return false;
		}

		if (!productId) {
			const error = new Error('Product ID is required for deletion');
			if (onError) onError(error);
			return false;
		}

		setIsDeleting(true);

		try {
			await deleteMutation.trigger(productId);

			if (onSuccess) {
				onSuccess(productId);
			}

			return true;
		} catch (error) {
			console.error('Error deleting product:', error);

			if (onError && error instanceof Error) {
				onError(error);
			}

			return false;
		} finally {
			setIsDeleting(false);
		}
	};

	return {
		deleteProductById,
		isDeleting: isDeleting || deleteMutation.isMutating,
	};
}
