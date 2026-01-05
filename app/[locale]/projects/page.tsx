import type { Project } from "#site/content";
import { projects } from "#site/content";
import { Card } from "@/app/components/card";
import { Navigation } from "@/app/components/nav";
import { routing, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Article } from "./article";

export const revalidate = 60;

type Props = {
	params: Promise<{ locale: Locale }>;
};

const BASE_URL = "https://www.avandaele.fr";

export function generateStaticParams(): { locale: Locale }[] {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "projects" });
	const baseUrl = locale === "fr" ? BASE_URL : `${BASE_URL}/en`;

	return {
		title: t("title"),
		description: t("description"),
		alternates: {
			canonical: `${baseUrl}/projects/`,
			languages: {
				fr: `${BASE_URL}/projects/`,
				en: `${BASE_URL}/en/projects/`,
			},
		},
	};
}

const sortProjects = (a: Project, b: Project): number =>
	new Date(b.dateStart ?? Number.POSITIVE_INFINITY).getTime() -
	new Date(a.dateStart ?? Number.POSITIVE_INFINITY).getTime();

const filterProjects = (
	projects: Project[],
	locale: Locale,
	featuredSlug: string,
	top2Slug: string,
	top3Slug: string,
): Project[] =>
	projects
		.filter((p) => p.published && p.locale === locale)
		.filter(
			(project) =>
				project.slug !== featuredSlug &&
				project.slug !== top2Slug &&
				project.slug !== top3Slug,
		)
		.sort(sortProjects);

export default async function ProjectsPage({
	params,
}: Props): Promise<React.ReactElement> {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("projects");

	const localeProjects = projects.filter((p) => p.locale === locale);
	const featured = localeProjects.find(
		(project) => project.slug === "veil-it",
	)!;
	const top2 = localeProjects.find((project) => project.slug === "epsor")!;
	const top3 = localeProjects.find(
		(project) => project.slug === "epitechTeacher",
	)!;
	const sorted = filterProjects(
		projects,
		locale,
		featured?.slug,
		top2?.slug,
		top3?.slug,
	);

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						{t("title")}
					</h2>
					<p className="mt-4 text-zinc-400">{t("description")}</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
					<Card>
						<Article project={featured} featured />
					</Card>

					<div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
						{[top2, top3].map(
							(project) =>
								project && (
									<Card key={project.slug}>
										<Article project={project} />
									</Card>
								),
						)}
					</div>
				</div>
				<div className="hidden w-full h-px md:block bg-zinc-800" />

				<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 0)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} />
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 1)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} />
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 2)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} />
								</Card>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
