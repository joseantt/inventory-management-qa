'use client';

import {
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from '@chakra-ui/react';
import { useProductSearch } from '@lib/hooks/useProductSearch';
import { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface ProductSearchProps {
	placeholder?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
}

export default function ProductSearch({
	placeholder = 'Search products...',
	size = 'md',
	variant = 'outline',
}: ProductSearchProps) {
	const { handleSearch, currentQuery } = useProductSearch();
	const [inputValue, setInputValue] = useState(currentQuery);

	useEffect(() => {
		setInputValue(currentQuery);
	}, [currentQuery]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		handleSearch(value);
	};

	const clearSearch = () => {
		setInputValue('');
		handleSearch('');
	};

	return (
		<InputGroup size={size}>
			<InputLeftElement pointerEvents="none">
				<FiSearch color="gray.300" />
			</InputLeftElement>

			<Input
				type="search"
				placeholder={placeholder}
				value={inputValue}
				onChange={onChange}
				variant={variant}
				bg="white"
				borderRadius="md"
				focusBorderColor="turquoise.700"
				_hover={{ borderColor: 'turquoise.600' }}
			/>

			{inputValue && (
				<InputRightElement>
					<IconButton
						aria-label="Clear search"
						icon={<FiX />}
						size="sm"
						variant="ghost"
						onClick={clearSearch}
					/>
				</InputRightElement>
			)}
		</InputGroup>
	);
}
