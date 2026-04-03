import { performRequest } from "@/app/lib/datocms";
import { SINGLE_POST_QUERY } from "@/app/queries/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;

		const data = await performRequest(SINGLE_POST_QUERY, {
			variables: { slug },
		});

		if (!data.post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data from DatoCMS" },
			{ status: 500 },
		);
	}
}
