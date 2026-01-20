"use client";

import PostComponentClient from "@/app/components/post-component-client";
import PrettyDate from "@/app/components/pretty-date";
import { useEffect, useState } from "react";
import SafeHTML from "../components/safe-html";
import styles from "./page.module.css";

interface PostImage {
	src: string;
	alt: string;
	title: string;
	base64: string;
}

interface Post {
	id: string;
	title: string;
	data: {
		value: any;
	};
	createdAt: string;
	updatedAt: string;
	images: Array<{
		responsiveImage: PostImage;
	}>;
}

export default function PostsPage() {
	const [pageData, setPageData] = useState<Post[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch("/api/posts", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});

				if (!response.ok) {
					throw new Error("Failed to fetch from API");
				}

				const data = await response.json();
				const page: Post[] = data.allPosts || [];

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
	}, []);

	if (loading) {
		return <div className="p-12 text-center">Lade Inhalte...</div>;
	}

	if (error || !pageData) {
		return (
			<div className="p-12 text-center">{error || "Kein Inhalt gefunden."}</div>
		);
	}

	console.log("PostsPage pageData:", pageData);

	return (
		<section className="p-12 pt-4 max-w-4xl mx-auto">
			{pageData.map((post) => (
				<PostComponent key={post.id} post={post} />
			))}
		</section>
	);
}

function PostComponent({ post }: { post: Post }) {
	return (
		<div className="flex flex-col lg:flex-row gap-6 mb-8 border-b border-gray-300 pb-8">
			<div className="flex-1">
				<h3 className="text-gray-800 text-2xl font-bold leading-8 mb-1">
					{post.title}
				</h3>
				<div className="text-gray-800 pb-5 text-base leading-7">
					<span className="text-gray-800 uppercase text-sm">
						| <PrettyDate date={post.createdAt} />
					</span>
					<div className={`post-text mt-4 ${styles.postText}`}>
						<SafeHTML content={post.data} />
					</div>
				</div>
			</div>
			{post.images.length > 0 && <PostComponentClient images={post.images} />}
		</div>
	);
}
