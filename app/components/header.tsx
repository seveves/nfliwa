"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const pathname = usePathname();

	const navItems = [
		{ href: "/posts", label: "Neuigkeiten", alt: "news" },
		{ href: "/termine", label: "Termine", alt: "events" },
		{ href: "/mitgliedschaft", label: "Mitgliedschaft", alt: "membership" },
	];

	const gruppenItems = [
		{ href: "/groups", label: "Übersicht" },
		{ href: "/uwd", label: "Umweltdetektiv*innen" },
		{ href: "/nfw", label: "Naturforscher*innen" },
		{ href: "/asl", label: "ASL" },
	];

	const wegenetzItems = [
		{ href: "/wanderwege", label: "Wanderwege" },
		{
			href: "https://trails.naturfreunde-lichtenwald.de",
			label: "MTB-Trails",
			external: true,
		},
	];

	const Dropdown = ({
		label,
		items,
		name,
	}: {
		label: string;
		items: any[];
		name: string;
	}) => (
		<div className="relative group">
			<button
				type="button"
				className="text-green-50 py-4 px-4 no-underline transition-colors duration-300 hover:bg-teal-600 text-sm font-medium flex items-center gap-1"
				onClick={() => setOpenDropdown(openDropdown === name ? null : name)}
			>
				{label}
				<span
					className={`transition-transform duration-300 ${openDropdown === name ? "rotate-180" : ""}`}
				>
					▼
				</span>
			</button>
			<div className="hidden group-hover:flex lg:absolute left-0 top-full flex-col bg-teal-600 shadow-lg rounded-b-md overflow-hidden">
				{items.map((item) =>
					item.external ? (
						<a
							key={item.label}
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-green-50 py-2 px-4 no-underline transition-colors duration-300 hover:bg-teal-700 block text-sm whitespace-nowrap"
						>
							{item.label}
						</a>
					) : (
						<Link
							key={item.href}
							href={item.href}
							className="text-green-50 py-2 px-4 no-underline transition-colors duration-300 hover:bg-teal-700 block text-sm whitespace-nowrap"
							onClick={() => {
								setOpenDropdown(null);
								setIsMenuOpen(false);
							}}
						>
							{item.label}
						</Link>
					),
				)}
			</div>
		</div>
	);

	return (
		<>
			<nav className="w-full h-16 bg-teal-700 text-green-50 fixed z-50 shadow-md top-0">
				<div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
					{/* Logo/Title */}
					<h2 className="m-0 p-0 flex-shrink-0">
						<a
							href="/"
							className="text-green-50 no-underline hover:underline text-lg sm:text-xl font-bold"
						>
							NaturFreunde Lichtenwald
						</a>
					</h2>

					{/* Desktop Navigation */}
					<ul className="hidden lg:flex list-none m-0 p-0 gap-0 flex-1 justify-end items-center">
						{navItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className={`text-green-50 py-4 px-4 no-underline transition-colors duration-300 hover:bg-teal-600 block text-sm font-medium ${
										pathname === item.href ? "underline" : ""
									}`}
								>
									{item.label}
								</Link>
							</li>
						))}
						<li>
							<Dropdown label="Gruppen" items={gruppenItems} name="gruppen" />
						</li>
						<li>
							<Dropdown
								label="Wegenetze"
								items={wegenetzItems}
								name="wegenetze"
							/>
						</li>
					</ul>

					{/* Mobile Menu Button */}
					<button
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="lg:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-2"
						aria-label="Toggle menu"
						aria-expanded={isMenuOpen}
					>
						<span
							className={`w-6 h-0.5 bg-green-50 transition-all duration-300 ${
								isMenuOpen ? "rotate-45 translate-y-2" : ""
							}`}
						/>
						<span
							className={`w-6 h-0.5 bg-green-50 transition-all duration-300 ${
								isMenuOpen ? "opacity-0" : ""
							}`}
						/>
						<span
							className={`w-6 h-0.5 bg-green-50 transition-all duration-300 ${
								isMenuOpen ? "-rotate-45 -translate-y-2" : ""
							}`}
						/>
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="lg:hidden bg-teal-600 shadow-lg">
						<ul className="list-none m-0 p-0 flex flex-col">
							{navItems.map((item) => (
								<li key={item.href} className="border-b border-teal-500">
									<Link
										href={item.href}
										className="text-green-50 py-3 px-4 no-underline transition-colors duration-300 hover:bg-teal-700 block text-base font-medium"
										onClick={() => setIsMenuOpen(false)}
									>
										{item.label}
									</Link>
								</li>
							))}
							<li className="border-b border-teal-500">
								<button
									type="button"
									onClick={() =>
										setOpenDropdown(
											openDropdown === "gruppen" ? null : "gruppen",
										)
									}
									className="w-full text-left text-green-50 py-3 px-4 no-underline transition-colors duration-300 hover:bg-teal-700 text-base font-medium bg-transparent border-none cursor-pointer flex justify-between items-center"
								>
									Gruppen
									<span
										className={`transition-transform duration-300 ${openDropdown === "gruppen" ? "rotate-180" : ""}`}
									>
										▼
									</span>
								</button>
								{openDropdown === "gruppen" && (
									<div className="bg-teal-700 border-t border-teal-500">
										{gruppenItems.map((item) => (
											<Link
												key={item.href}
												href={item.href}
												className="text-green-50 py-2 px-8 no-underline transition-colors duration-300 hover:bg-teal-800 block text-sm font-medium"
												onClick={() => {
													setOpenDropdown(null);
													setIsMenuOpen(false);
												}}
											>
												{item.label}
											</Link>
										))}
									</div>
								)}
							</li>
							<li className="border-b border-teal-500">
								<button
									type="button"
									onClick={() =>
										setOpenDropdown(
											openDropdown === "wegenetze" ? null : "wegenetze",
										)
									}
									className="w-full text-left text-green-50 py-3 px-4 no-underline transition-colors duration-300 hover:bg-teal-700 text-base font-medium bg-transparent border-none cursor-pointer flex justify-between items-center"
								>
									Wegenetze
									<span
										className={`transition-transform duration-300 ${openDropdown === "wegenetze" ? "rotate-180" : ""}`}
									>
										▼
									</span>
								</button>
								{openDropdown === "wegenetze" && (
									<div className="bg-teal-700 border-t border-teal-500">
										{wegenetzItems.map((item) =>
											item.external ? (
												<a
													key={item.label}
													href={item.href}
													target="_blank"
													rel="noopener noreferrer"
													className="text-green-50 py-2 px-8 no-underline transition-colors duration-300 hover:bg-teal-800 block text-sm font-medium"
													onClick={() => {
														setOpenDropdown(null);
														setIsMenuOpen(false);
													}}
												>
													{item.label}
												</a>
											) : (
												<Link
													key={item.href}
													href={item.href}
													className="text-green-50 py-2 px-8 no-underline transition-colors duration-300 hover:bg-teal-800 block text-sm font-medium"
													onClick={() => {
														setOpenDropdown(null);
														setIsMenuOpen(false);
													}}
												>
													{item.label}
												</Link>
											),
										)}
									</div>
								)}
							</li>
						</ul>
					</div>
				)}
			</nav>
			{/* Spacer for fixed header */}
			<div className="h-16" />
		</>
	);
}
