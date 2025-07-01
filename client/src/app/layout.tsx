import WithSubNavigation from '@components/navigation/navbar/Navbar';
import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';
import Footer from '@components/navigation/footer/Footer';
import { Providers } from './providers';

const onest = Onest({
	variable: '--font-onest',
	subsets: ['latin'],
});
export const metadata: Metadata = {
	title: 'Fuji Inventory',
	description:
		'Fuji Inventory is a powerful inventory management system designed to help businesses efficiently track and manage their inventory levels, orders, sales, and deliveries.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${onest.className}`}>
				<div className="background" />
				<Providers>
					<WithSubNavigation />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
