import { Header } from "@/app/components/header/header";
import { Mdx } from "@/app/components/mdx";
import { redirect } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { projects } from "#site/content";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "./mdx.css";
import TestimonialsView from "./TestimonialsView";

export const revalidate = 60;

type Props = {
	params: Promise<{
		locale: Locale;
		slug: string;
	}>;
};

const BASE_URL = "https://www.avandaele.fr";

export function generateStaticParams(): { locale: Locale; slug: string }[] {
	return routing.locales.flatMap((locale) =>
		projects
			.filter((p) => p.published && p.locale === locale)
			.map((p) => ({
				locale,
				slug: p.slug,
			})),
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const project = projects.find((p) => p.slug === slug && p.locale === locale);

	if (!project) {
		return {};
	}

	const baseUrl = locale === "fr" ? BASE_URL : `${BASE_URL}/en`;

	return {
		title: project.title,
		description: project.description,
		alternates: {
			canonical: `${baseUrl}/projects/${slug}`,
			languages: {
				fr: `${BASE_URL}/projects/${slug}`,
				en: `${BASE_URL}/en/projects/${slug}`,
			},
		},
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

export default async function PostPage({
	params,
}: Props): Promise<React.ReactElement> {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const project = projects.find(
		(project) => project.slug === slug && project.locale === locale,
	);

	if (!project) {
		const frProject = projects.find(
			(p) => p.slug === slug && p.locale === "fr",
		);
		if (frProject) {
			redirect({ href: `/projects/${slug}`, locale: "fr" });
		}
		notFound();
	}

	const baseUrl = locale === "fr" ? BASE_URL : `${BASE_URL}/en`;

	const projectJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: project.title,
		description: project.description,
		url: `${baseUrl}/projects/${slug}`,
		author: {
			"@type": "Person",
			name: "Aurélien Vandaële",
			url: BASE_URL,
		},
		...(project.dateStart && { datePublished: project.dateStart }),
		...(project.dateEnd && { dateModified: project.dateEnd }),
		...(project.ogImage && { image: project.ogImage }),
	};

	return (
		<div className="bg-zinc-50 min-h-screen">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
			/>
			<Header project={project} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={project.content} />
				<TestimonialsView project={project} />
			</article>
		</div>
	);
}
