import type { Product } from '@lib/model/product.model';

const API_ULR = `${process.env.NEXT_PUBLIC_API_URL}/product`;

type ActionProps = {
	url?: string;
	product: Product;
	headers?: Record<string, string>;
};

export async function createProduct({
	url = API_ULR,
	product,
	headers,
}: ActionProps): Promise<Product> {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify(product),
	});

	if (!response.ok) {
		throw new Error('Failed to create product');
	}

	return response.json();
}

export async function updateProduct({
	url = API_ULR,
	product,
	headers,
}: ActionProps) {
	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify(product),
	});

	if (!response.ok) {
		throw new Error('Failed to update product');
	}

	return response.json();
}

export async function deleteProduct({
	url = API_ULR,
	productId,
	headers,
}: ActionProps & { productId: string }) {
	const response = await fetch(`${url}/${productId}`, {
		method: 'DELETE',
		headers: {
			...headers,
		},
	});

	console.log('Delete response:', response);

	if (!response.ok) {
		throw new Error('Failed to delete product');
	}

	return response.json();
}
