import { defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

export default defineConfig({
	root: "content",
	output: {
		data: ".velite",
		assets: "public/static",
		base: "/static/",
		name: "[name]-[hash:6].[ext]",
		clean: true,
	},
	collections: {
		projects: {
			name: "Project",
			pattern: "projects/**/*.mdx",
			schema: s
				.object({
					title: s.string().max(99),
					description: s.string().max(999),
					published: s.boolean().default(false),
					dateStart: s.isodate().optional(),
					dateEnd: s.isodate().optional(),
					url: s.string().optional(),
					repository: s.string().optional(),
					playStoreURL: s.string().optional(),
					appStoreURL: s.string().optional(),
					ogImage: s.string().optional(),
					testimonials: s.array(s.any()).optional(),
					metadata: s.metadata(),
					content: s.mdx(),
				})
				.transform((data, { meta }) => {
					const slug = meta.basename?.replace(/\.mdx$/, "") || "";
					return {
						...data,
						slug,
						path: `/projects/${slug}`,
					};
				}),
		},
		me: {
			name: "Me",
			pattern: "me/**/*.mdx",
			schema: s
				.object({
					title: s.string().max(99),
					description: s.string().max(999),
					img: s.string().optional(),
					metadata: s.metadata(),
					content: s.mdx(),
				})
				.transform((data, { meta }) => ({
					...data,
					slug: meta.basename?.replace(/\.mdx$/, "") || "",
				})),
		},
	},
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: "github-dark",
					onVisitLine(node: {
						children: Array<{ type: string; value: string }>;
					}) {
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node: {
						properties: { className: string[] };
					}) {
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedWord(node: {
						properties: { className: string[] };
					}) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});
