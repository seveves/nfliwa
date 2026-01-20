import { performRequest } from "@/app/lib/datocms";
import { POSTS_QUERY } from "@/app/queries/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
	try {
		const data = await performRequest(POSTS_QUERY, { variables: {} });

		return NextResponse.json(data);
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data from DatoCMS" },
			{ status: 500 },
		);
	}
}
