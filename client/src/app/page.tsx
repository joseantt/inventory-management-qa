'use client';

import { Flex } from '@chakra-ui/react';
import HeroWithIllustration from '@components/hero/HeroWithIllustration';

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
