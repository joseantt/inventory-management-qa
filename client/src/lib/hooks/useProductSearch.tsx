import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function useProductSearch() {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const currentQuery = searchParams.get('query') || '';

	const handleSearch = useDebouncedCallback((searchText: string) => {
		const params = new URLSearchParams(searchParams);

		params.set('page', '1');

		if (searchText && searchText.length >= 2) {
			params.set('query', searchText);
		} else {
			params.delete('query');
		}

		replace(`${pathname}?${params}`);
	}, 500);

	return {
		handleSearch,
		currentQuery,
	};
}
