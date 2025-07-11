'use client';

import {
	Box,
	Container,
	chakra,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from '@chakra-ui/react';
// import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import type { ReactNode } from 'react';
import NavbarImagotipo from '@/components/brand/NavbarImagotipo';

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue('gray.100', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
		>
			<Container
				as={Stack}
				maxW={'6xl'}
				py={4}
				spacing={4}
				justify={'center'}
				align={'center'}
			>
				<NavbarImagotipo width={209} height={38} />
			</Container>

			<Box
				borderTopWidth={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.700')}
			>
				<Container
					as={Stack}
					maxW={'6xl'}
					py={4}
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					justify={{ base: 'center', md: 'center' }}
					align={{ base: 'center', md: 'center' }}
				>
					<Text>© 2025 Fuji Inventory. All rights reserved</Text>
					{/* <Stack direction={'row'} spacing={6}>
						<SocialButton label={'Twitter'} href={'#'}>
							<FaTwitter />
						</SocialButton>
						<SocialButton label={'YouTube'} href={'#'}>
							<FaYoutube />
						</SocialButton>
						<SocialButton label={'Instagram'} href={'#'}>
							<FaInstagram />
						</SocialButton>
					</Stack> */}
				</Container>
			</Box>
		</Box>
	);
}
