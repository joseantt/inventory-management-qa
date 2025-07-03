import type { Product } from '@lib/model/product.model';
import { useMemo } from 'react';

interface UseProductTableProps {
	products: Product[];
	isLoading?: boolean;
}

interface UseProductTableReturn {
	tableData: Product[];
	getCategoryColor: (category: string) => string;
	formatPrice: (price: string) => string;
	isLoading: boolean;
	isEmpty: boolean;
}

export function useProductTable({
	products,
	isLoading = false,
}: UseProductTableProps): UseProductTableReturn {
	const tableData = useMemo(() => products, [products]);
	const isEmpty = useMemo(() => !tableData.length, [tableData]);

	const getCategoryColor = (category: string) => {
		const colorMap: Record<string, string> = {
			ELECTRONICS: 'blue',
			CLOTHING: 'purple',
			FOOD: 'green',
			BOOKS: 'orange',
			TOYS: 'pink',
			FURNITURE: 'yellow',
			OTHER: 'gray',
		};

		return colorMap[category] || 'gray';
	};

	const formatPrice = (price: string) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(Number(price));
	};

	return {
		tableData,
		getCategoryColor,
		formatPrice,
		isLoading,
		isEmpty,
	};
}
