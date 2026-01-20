"use client";

import * as StructuredText from "datocms-structured-text-to-html-string";
import DOMPurify from "dompurify";

export default function SafeHTML({ content }: { content: { value: any } }) {
	const structuredHtml = StructuredText.render(content) as string;
	const sanitizedContent = DOMPurify.sanitize(structuredHtml, {
		USE_PROFILES: { html: true },
		ALLOWED_TAGS: [
			"p",
			"b",
			"i",
			"em",
			"strong",
			"a",
			"ul",
			"ol",
			"li",
			"br",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"blockquote",
		],
		ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title"],
	});

	return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
