import { useEffect, useState } from 'react';

export default function useStockProducts() {
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState([]);

	const { data, error, isLoading } = useSWR('/api/user/page=10', fetcher);

	return { isLoading, products };
}
