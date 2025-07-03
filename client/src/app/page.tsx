'use client';

import { Flex } from '@chakra-ui/react';
import HeroWithIllustration from '@components/hero/HeroWithIllustration';
// import { useKeycloak } from '@react-keycloak/web';
// import { useRouter, useSearchParams } from 'next/navigation';
// import useSWR from 'swr';
// import { fetcher } from '@/lib/swr/fetcher';

// export function useUsers() {
// 	const router = useRouter();

// 	const goToPage = (page: number) => {
// 		router.push(`?page=${page}&limit=3`);
// 	};

// 	const searchParams = useSearchParams();
// 	const page = Number.parseInt(searchParams.get('page') ?? '1', 10);
// 	const limit = Number.parseInt(searchParams.get('limit') ?? '10', 10);

// 	const { data, error, isLoading, isValidating } = useSWR(
// 		`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
// 		fetcher,
// 		{
// 			dedupingInterval: 300000,
// 			revalidateOnFocus: false,
// 			revalidateOnReconnect: false,
// 			revalidateIfStale: false,
// 		},
// 	);

// 	return {
// 		users: data,
// 		isLoading: isLoading,
// 		isError: error,
// 		isValidating: isValidating,
// 		goToPage,
// 	};
// }

export default function Home() {
	return (
		<main>
			<Flex
				direction="column"
				alignItems="flex-start"
				justifyContent="top"
				flexGrow={1}
				width="100%"
				h="calc(100vh - 187px)"
			>
				<HeroWithIllustration />
			</Flex>
		</main>
	);
}
