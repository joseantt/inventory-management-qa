'use client';

import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PRODUCT_CATEGORIES = [
	'ELECTRONICS',
	'CLOTHING',
	'FOOD',
	'BOOKS',
	'TOYS',
	'FURNITURE',
	'OTHER',
];

interface FilterByCategoryProps {
	label?: string;
	placeholder?: string;
}

export default function FilterByCategory({
	label = 'Category',
	placeholder = 'All Categories',
}: FilterByCategoryProps) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const [value, setValue] = useState(searchParams.get('category') || '');

	useEffect(() => {
		setValue(searchParams.get('category') || '');
	}, [searchParams]);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setValue(value);

		const params = new URLSearchParams(searchParams);

		if (value) {
			params.set('category', value);
		} else {
			params.delete('category');
		}

		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<FormControl>
			<FormLabel fontSize="sm" mb={1}>
				{label}
			</FormLabel>
			<Select
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				size="md"
				borderRadius="md"
				bg="white"
				focusBorderColor="turquoise.700"
			>
				{PRODUCT_CATEGORIES.map((category) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</Select>
		</FormControl>
	);
}
