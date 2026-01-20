'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageModal from './image-modal';

interface PostImage {
	src: string;
	alt: string;
	title: string;
	base64: string;
}

interface PostComponentClientProps {
	images: Array<{
		responsiveImage: PostImage;
	}>;
}

export default function PostComponentClient({
	images,
}: PostComponentClientProps) {
	const [selectedImage, setSelectedImage] = useState<PostImage | null>(null);

	return (
		<>
			<div className="w-full lg:w-80 flex-shrink-0">
				<div className="p-5 mt-6">
					{images.map((image, i) => (
						<div key={i} className="mb-4">
							<button
								onClick={() => setSelectedImage(image.responsiveImage)}
								className="w-full cursor-pointer hover:opacity-80 transition-opacity rounded overflow-hidden"
							>
								<Image
									src={image.responsiveImage.src}
									alt={image.responsiveImage.alt || 'not set'}
									title={image.responsiveImage.title}
									width={300}
									height={300}
									className="w-full h-auto rounded"
									placeholder="blur"
									blurDataURL={image.responsiveImage.base64}
								/>
							</button>
						</div>
					))}
				</div>
			</div>

			<ImageModal
				src={selectedImage?.src || ''}
				alt={selectedImage?.alt || ''}
				title={selectedImage?.title}
				isOpen={!!selectedImage}
				onClose={() => setSelectedImage(null)}
			/>
		</>
	);
}
