import Image from "next/image";
import { performRequest } from "@/app/lib/datocms";
import { POSTS_QUERY } from "@/app/queries/posts";
import PrettyDate from "@/app/components/pretty-date";
import PostComponentClient from "@/app/components/post-component-client";
import * as StructuredText from "datocms-structured-text-to-html-string";
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

export default async function PostsPage() {
	const data = await performRequest<{ allPosts: Post[] }>(POSTS_QUERY);
	const posts = data.allPosts;

	return (
		<section className="p-12 pt-4 max-w-4xl mx-auto">
			{posts.map((post) => (
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
					<div
						className={`post-text mt-4 ${styles.postText}`}
						dangerouslySetInnerHTML={{
							__html: StructuredText.render(post.data),
						}}
					/>
				</div>
			</div>
			{post.images.length > 0 && <PostComponentClient images={post.images} />}
		</div>
	);
}
