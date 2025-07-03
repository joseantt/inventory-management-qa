'use client';

import {
	FormControl,
	FormLabel,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface FilterByMinAmountProps {
	label?: string;
}

export default function FilterByMinAmount({
	label = 'Min Price',
}: FilterByMinAmountProps) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const [value, setValue] = useState(searchParams.get('minPrice') || '');

	useEffect(() => {
		setValue(searchParams.get('minPrice') || '');
	}, [searchParams]);

	const updateURL = useDebouncedCallback((newValue: string) => {
		const params = new URLSearchParams(searchParams);

		if (newValue && Number.parseFloat(newValue) > 0) {
			params.set('minPrice', newValue);
		} else {
			params.delete('minPrice');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 500);

	const handleChange = (valueString: string) => {
		setValue(valueString);
		updateURL(valueString);
	};

	return (
		<FormControl>
			<FormLabel fontSize="sm" mb={1}>
				{label}
			</FormLabel>
			<NumberInput
				value={value}
				onChange={handleChange}
				min={0}
				precision={2}
				size="md"
				borderRadius="md"
				bg="white"
				focusBorderColor="turquoise.700"
			>
				<NumberInputField placeholder={label} />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</FormControl>
	);
}
