'use client';

import Image from 'next/image';

interface ImageModalProps {
	src: string;
	alt: string;
	title?: string;
	isOpen: boolean;
	onClose: () => void;
}

export default function ImageModal({
	src,
	alt,
	title,
	isOpen,
	onClose,
}: ImageModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
			onClick={onClose}
		>
			<div
				className="relative bg-white rounded-lg overflow-hidden flex flex-col"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
					aria-label="Close modal"
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Image Container */}
				<div className="relative bg-gray-100 flex items-center justify-center max-h-[90vh] overflow-auto">
					<Image
						src={src}
						alt={alt}
            width={600}
            height={450}
						priority
					/>
				</div>

				{/* Title */}
				{title && (
					<div className="bg-gray-800 text-white p-4 text-center flex-shrink-0">
						{title}
					</div>
				)}
			</div>
		</div>
	);
}
