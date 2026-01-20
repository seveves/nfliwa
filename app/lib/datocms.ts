import { executeQuery, ExecuteQueryOptions } from "@datocms/cda-client";

export async function performRequest(query: string, options: any = {}) {
	const result = await executeQuery(query, {
		...options,
		token: process.env.DATOCMS_API_TOKEN as string,
		environment: process.env.DATOCMS_ENVIRONMENT,
	});
	return result;
}
