import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const quicksand = Quicksand({
	variable: "--font-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "NaturFreunde Lichtenwald",
	description: "NaturFreunde Lichtenwald Website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${quicksand.variable} font-sans antialiased`}>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
