"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ImageGallery from "@/app/components/image-gallery";
import * as StructuredText from "datocms-structured-text-to-html-string";
import styles from "./page.module.css";

interface ResponsiveImage {
	src: string;
	alt: string;
	title: string;
	base64: string;
}

interface StaticPageData {
	id: string;
	title: string;
	pageid: string;
	data: {
		value: any;
	};
	image: {
		responsiveImage: ResponsiveImage;
	} | null;
	enbw: {
		responsiveImage: ResponsiveImage;
	} | null;
	gallery: Array<{
		responsiveImage: ResponsiveImage;
	}> | null;
}

const SLUG_MAP: Record<string, string> = {
	umweltdetektivinnen: "uwd",
	naturforscherinnen: "nfw",
	asl: "asl",
	termine: "events",
	mitgliedschaft: "membership",
	wanderwege: "hikes",
	gruppen: "groups",
	datenschutz: "dataprivacy",
	impressum: "imprint",
};

export default function StaticPage() {
	const params = useParams();
	const slug = params.slug as string;
	const [pageData, setPageData] = useState<StaticPageData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch("/api/datocms", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ pageid: SLUG_MAP[slug] || slug }),
				});

				if (!response.ok) {
					throw new Error("Failed to fetch from API");
				}

				const data = await response.json();
				const page: StaticPageData | null = data.static || null;

				if (!page) {
					setError("Page not found");
					setPageData(null);
				} else {
					setPageData(page);
				}
			} catch (err) {
				console.error("Error fetching page:", err);
				setError("Failed to load page");
				setPageData(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [slug]);

	if (loading) {
		return <div className="p-12 text-center">Loading...</div>;
	}

	if (error || !pageData) {
		return <div className="p-12 text-center">{error || "Page not found"}</div>;
	}

	return (
		<section className="p-12 pt-4 max-w-4xl mx-auto">
			<div>
				<h3 className="text-gray-800 text-3xl font-bold mb-6">
					{pageData.title}
				</h3>
			</div>

			{pageData.image && (
				<div className="mb-8">
					<Image
						src={pageData.image.responsiveImage.src}
						alt={pageData.image.responsiveImage.alt || "not set"}
						title={pageData.image.responsiveImage.title}
						width={600}
						height={400}
						className="w-full h-auto rounded-lg"
						placeholder="blur"
						blurDataURL={pageData.image.responsiveImage.base64}
					/>
				</div>
			)}

			<div
				className={`text-gray-800 text-base leading-7 mb-8 ${styles.structuredContent}`}
			>
				<div
					dangerouslySetInnerHTML={{
						__html: StructuredText.render(pageData.data),
					}}
				/>
			</div>

			{pageData.enbw && (
				<div className="mb-8">
					<Image
						src={pageData.enbw.responsiveImage.src}
						alt={pageData.enbw.responsiveImage.alt || "not set"}
						title={pageData.enbw.responsiveImage.title}
						width={400}
						height={300}
						className="w-full max-w-md h-auto"
						placeholder="blur"
						blurDataURL={pageData.enbw.responsiveImage.base64}
					/>
				</div>
			)}

			{pageData.gallery && pageData.gallery.length > 0 && (
				<ImageGallery
					items={pageData.gallery.map((item) => ({
						src: item.responsiveImage.src,
						alt: item.responsiveImage.alt || "not set",
						title: item.responsiveImage.title,
						base64: item.responsiveImage.base64,
					}))}
				/>
			)}
		</section>
	);
}
