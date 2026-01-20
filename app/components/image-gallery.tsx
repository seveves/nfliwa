'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryItem {
	src: string;
	alt: string;
	title?: string;
	base64?: string;
}

interface ImageGalleryProps {
	items: GalleryItem[];
}

export default function ImageGallery({ items }: ImageGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || items.length === 0) {
		return null;
	}

	const currentItem = items[currentIndex];

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div className="w-full mt-12">
			<h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Projektbilder</h2>

			{/* Main Carousel */}
			<div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-6">
				<div className="relative w-full aspect-video">
					<Image
						src={currentItem.src}
						alt={currentItem.alt}
						title={currentItem.title}
						fill
						className="object-cover"
						placeholder={currentItem.base64 ? 'blur' : 'empty'}
						blurDataURL={currentItem.base64}
					/>

					{/* Navigation Buttons */}
					<button
						onClick={goToPrevious}
						className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
						aria-label="Previous slide"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<button
						onClick={goToNext}
						className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
						aria-label="Next slide"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>

					{/* Slide Counter */}
					<div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
						{currentIndex + 1} / {items.length}
					</div>
				</div>

				{/* Image Title */}
				{currentItem.title && (
					<div className="bg-gray-800 text-white p-4 text-center">{currentItem.title}</div>
				)}
			</div>

			{/* Thumbnail Strip */}
			<div className="overflow-x-auto">
				<div className="flex gap-2 pb-4 px-2">
					{items.map((item, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`flex-shrink-0 w-24 h-24 rounded overflow-hidden transition-all ${
								index === currentIndex ? 'ring-2 ring-teal-600 opacity-100' : 'opacity-60 hover:opacity-80'
							}`}
							aria-label={`Go to slide ${index + 1}`}
						>
							<Image
								src={item.src}
								alt={item.alt}
								width={96}
								height={96}
								className="w-full h-full object-cover"
								placeholder={item.base64 ? 'blur' : 'empty'}
								blurDataURL={item.base64}
							/>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
