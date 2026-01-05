import { Header } from "@/app/components/header/header";
import { Mdx } from "@/app/components/mdx";
import TestimonialsView from "@/app/projects/[slug]/TestimonialsView";
import { projects } from "#site/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./mdx.css";

export const revalidate = 60;

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	return projects
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);

	if (!project) {
		return {};
	}

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: project.title,
			description: project.description,
			type: "article",
			...(project.ogImage && { images: [{ url: project.ogImage }] }),
		},
		twitter: {
			card: "summary_large_image",
			title: project.title,
			description: project.description,
			...(project.ogImage && { images: [project.ogImage] }),
		},
	};
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const project = projects.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header project={project} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={project.content} />
				<TestimonialsView project={project} />
			</article>
		</div>
	);
}
