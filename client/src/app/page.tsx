import { Flex } from '@chakra-ui/react';
import HeroWithIllustration from '@components/hero/HeroWithIllustration';

export default function Home() {
	return (
		<main>
			<Flex
				direction="row"
				alignItems="center"
				flexGrow={1}
				justifyContent="center"
				width="100%"
			>
				<HeroWithIllustration />
			</Flex>
		</main>
	);
}
