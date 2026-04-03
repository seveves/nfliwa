"use client";

import PrettyDate from "@/app/components/pretty-date";
import { useEffect, useState } from "react";
import SafeHTML from "../../components/safe-html";
import { useParams } from "next/navigation";
import PostComponentClient from "@/app/components/post-component-client";
import styles from "../page.module.css";

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

export default function SinglePostPage() {
	const params = useParams();
	const id = params.id as string;
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`/api/posts/${id}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});

				if (!response.ok) {
					if (response.status === 404) {
						setError("Post nicht gefunden");
					} else {
						throw new Error("Failed to fetch from API");
					}
					setPost(null);
					return;
				}

				const data = await response.json();
				const fetchedPost: Post = data.post;

				if (!fetchedPost) {
					setError("Post nicht gefunden");
					setPost(null);
				} else {
					setPost(fetchedPost);
				}
			} catch (err) {
				console.error("Error fetching post:", err);
				setError("Fehler beim Laden des Posts");
				setPost(null);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchPost();
		}
	}, [id]);

	if (loading) {
		return <div className="p-6 lg:p-12 text-center">Lade Inhalte...</div>;
	}

	if (error || !post) {
		return (
			<div className="p-6 lg:p-12 text-center">
				{error || "Post nicht gefunden"}
			</div>
		);
	}

	return (
		<section className="p-6 lg:p-12 pt-4 max-w-4xl mx-auto">
			<div className="flex flex-col lg:flex-row gap-6 mb-8">
				<div className="flex-1">
					<h1 className="text-gray-800 text-3xl font-bold leading-8 mb-1">
						{post.title}
					</h1>
					<div className="text-gray-800 pb-5 text-base leading-7">
						<span className="text-gray-800 uppercase text-sm">
							| <PrettyDate date={post.createdAt} />
						</span>
						<div className={`post-text mt-4 ${styles.postText}`}>
							<SafeHTML content={post.data} />
						</div>
					</div>
				</div>
				{post.images && post.images.length > 0 && (
					<PostComponentClient images={post.images} />
				)}
			</div>
		</section>
	);
}
