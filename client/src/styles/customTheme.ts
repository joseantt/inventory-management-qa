import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	// styles: {
	// 	global: () => ({
	// 		body: {
	// 			bg: 'orange.50',
	// 		}
	// 	})
	// },
	colors: {
		denim: {
			'50': '#f2f7fd',
			'100': '#e3edfb',
			'200': '#c2ddf5',
			'300': '#8cc0ed',
			'400': '#4e9ee2',
			'500': '#2782d0',
			'600': '#1967b0',
			'700': '#15528f',
			'800': '#164776',
			'900': '#173b61', //main
			'950': '#102641',
		},
		turquoise: {
			'50': '#edfefd',
			'100': '#d0fdfd',
			'200': '#a8f8f9',
			'300': '#6bf1f5',
			'400': '#28e0e8',
			'500': '#0cc3ce',
			'600': '#0d9cad',
			'700': '#127d8c',
			'800': '#17616e', //main
			'900': '#185461',
			'950': '#0a3742',
		},
		orange: {
			'50': '#fff9ed',
			'100': '#fff1d4', //pure main
			'200': '#ffdfa9',
			'300': '#ffc672',
			'400': '#fea339',
			'500': '#fd8916', //main
			'600': '#ee6b08',
			'700': '#c55109',
			'800': '#9c3f10',
			'900': '#7e3610',
			'950': '#441806',
		},
	},
});

export default theme;
