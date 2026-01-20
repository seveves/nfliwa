import { performRequest } from "@/app/lib/datocms";
import { STATICS_QUERY } from "@/app/queries/statics";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { pageid } = await request.json();

		if (!pageid) {
			return NextResponse.json(
				{ error: "Missing pageid parameter" },
				{ status: 400 },
			);
		}

		console.log("API: Fetching static page for pageid:", pageid);
		const data = await performRequest(STATICS_QUERY, { variables: { pageid } });

		return NextResponse.json(data);
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data from DatoCMS" },
			{ status: 500 },
		);
	}
}
