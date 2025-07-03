'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Options = {
	totalRegisters: number;
	registersPerPage?: number;
	siblingsCount?: number;
	pageParam?: string;
	debounceTime?: number;
};

type Pagination = {
	totalPages: number;
	registersPerPage: number;
	currentPage: number;
	nextPages: number[];
	previousPages: number[];
	siblingsCount: number;
	goToPage: (page: number) => void;
	goToNextPage: () => void;
	goToPreviousPage: () => void;
};

function generatePagesArray(from: number, to: number): number[] {
	return [...new Array(to - from)]
		.map((_, index) => from + index + 1)
		.filter((page) => page > 0);
}

export function usePagination({
	totalRegisters,
	registersPerPage = 10,
	siblingsCount = 1,
	pageParam = 'page',
	debounceTime = 300,
}: Options): Pagination {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const pageFromUrl = searchParams.get(pageParam);
	const initialPage = pageFromUrl ? Number.parseInt(pageFromUrl, 10) : 1;

	const [currentPage, setCurrentPage] = useState(initialPage);

	const totalPages = Math.max(Math.ceil(totalRegisters / registersPerPage), 1);

	const updateUrlWithDebounce = useDebouncedCallback((page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set(pageParam, page.toString());
		replace(`${pathname}?${params.toString()}`);
	}, debounceTime);

	const goToPage = useCallback(
		(page: number) => {
			if (page >= 1 && page <= totalPages) {
				setCurrentPage(page);
				updateUrlWithDebounce(page);
			}
		},
		[totalPages, updateUrlWithDebounce],
	);

	const goToNextPage = useCallback(() => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	}, [currentPage, totalPages, goToPage]);

	const goToPreviousPage = useCallback(() => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	}, [currentPage, goToPage]);

	useEffect(() => {
		const pageFromUrl = searchParams.get(pageParam);
		if (pageFromUrl) {
			const parsedPage = Number.parseInt(pageFromUrl, 10);
			if (parsedPage !== currentPage) {
				setCurrentPage(parsedPage);
			}
		} else if (currentPage !== 1) {
			setCurrentPage(1);
		}
	}, [searchParams, pageParam, currentPage]);

	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			goToPage(totalPages);
		}
	}, [totalPages, currentPage, goToPage]);

	const previousPages =
		currentPage > 1
			? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
			: [];

	const nextPages =
		currentPage < totalPages
			? generatePagesArray(
					currentPage,
					Math.min(currentPage + siblingsCount, totalPages),
				)
			: [];

	return {
		currentPage,
		totalPages,
		nextPages,
		previousPages,
		registersPerPage,
		siblingsCount,
		goToPage,
		goToNextPage,
		goToPreviousPage,
	};
}
