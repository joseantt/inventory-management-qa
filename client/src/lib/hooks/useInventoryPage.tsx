import { useDisclosure } from '@chakra-ui/react';
import { Routes } from '@lib/constants/routes.constants';
import type { Product } from '@lib/model/product.model';
import { fetcher } from '@lib/swr/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { NEXT_PUBLIC_API_URL } from '../constants/config.constants';

const API_URL = NEXT_PUBLIC_API_URL;

type ProductResponseDTO = {
	content: Product[];
	page: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
};

export function useInventoryPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { keycloak, initialized } = useKeycloak();
	const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
		undefined,
	);
	const [isAuthChecking, setIsAuthChecking] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const handleEditProduct = (product: Product) => {
		setSelectedProduct(product);
		onEditOpen();
	};

	const handleDeleteProduct = (product: Product) => {
		setSelectedProduct(product);
		onDeleteOpen();
	};

	const handleUpdateProduct = (updatedProduct: Product) => {
		console.log('Product updated:', updatedProduct);
	};

	const handleConfirmDelete = (productId: string) => {
		console.log('Product deleted:', productId);
	};

	useEffect(() => {
		if (!initialized) {
			setIsAuthChecking(true);
			return;
		}

		const checkAuthAndPermissions = async () => {
			try {
				if (!keycloak.authenticated) {
					sessionStorage.setItem(
						'redirectAfterLogin',
						window.location.pathname,
					);

					keycloak.login({
						redirectUri: window.location.origin + Routes.Inventory,
					});
					return;
				}

				const hasPermission =
					keycloak.resourceAccess?.['inventory-backend']?.roles?.includes(
						'admin',
					) ||
					keycloak.resourceAccess?.['inventory-backend']?.roles?.includes(
						'employee',
					);

				if (!hasPermission) {
					router.push(Routes.Home);
					return;
				}

				setIsAuthChecking(false);
			} catch (error) {
				console.error('Error checking auth:', error);
				setIsAuthChecking(false);
			}
		};

		checkAuthAndPermissions();
	}, [initialized, keycloak, router]);

	const shouldFetch = !isAuthChecking && initialized && keycloak.authenticated;

	const query = searchParams.get('query');
	const category = searchParams.get('category');
	const page = searchParams.get('page');
	const minPrice = searchParams.get('minPrice');
	const maxPrice = searchParams.get('maxPrice');

	const {
		data: products = {
			content: [] as Product[],
			page: 0,
			pageSize: 10,
			totalElements: 0,
			totalPages: 0,
		},
		error,
		isLoading,
		isValidating,
		mutate,
	} = useSWR<ProductResponseDTO>(
		shouldFetch
			? `${API_URL}/product/?${new URLSearchParams({
					search: query ?? '',
					category: category ?? '',
					page: (page && !Number.isNaN(Number(page))
						? Number(page) - 1
						: 0
					).toString(),
					minPrice: minPrice ?? '',
					maxPrice: maxPrice ?? '',
				}).toString()}`
			: null,
		fetcher,
		{
			dedupingInterval: 300000,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			revalidateIfStale: false,
		},
	);

	const refreshProducts = () => {
		mutate();
	};

	return {
		selectedProduct,
		setSelectedProduct,
		handleEditProduct,
		handleDeleteProduct,
		handleUpdateProduct,
		handleConfirmDelete,
		refreshProducts,
		isOpen,
		onOpen,
		onClose,
		isEditOpen,
		onEditOpen,
		onEditClose,
		isDeleteOpen,
		onDeleteOpen,
		onDeleteClose,
		products,
		error,
		isLoading,
		isValidating,
		isAuthChecking,
	};
}
