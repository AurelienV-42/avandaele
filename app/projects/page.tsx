import type { Project } from "#site/content";
import { projects } from "#site/content";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { Article } from "./article";

export const revalidate = 60;

const sortProjects = (a: Project, b: Project) =>
	new Date(b.dateStart ?? Number.POSITIVE_INFINITY).getTime() -
	new Date(a.dateStart ?? Number.POSITIVE_INFINITY).getTime();

const filterProjects = (
	projects: Project[],
	featuredSlug: string,
	top2Slug: string,
	top3Slug: string,
) =>
	projects
		.filter((p) => p.published)
		.filter(
			(project) =>
				project.slug !== featuredSlug &&
				project.slug !== top2Slug &&
				project.slug !== top3Slug,
		)
		.sort(sortProjects);

export default async function ProjectsPage() {
	const featured = projects.find((project) => project.slug === "impress")!;
	const top2 = projects.find((project) => project.slug === "epsor")!;
	const top3 = projects.find(
		(project) => project.slug === "collective-pantheon",
	)!;
	const sorted = filterProjects(
		projects,
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
						Projects
					</h2>
					<p className="mt-4 text-zinc-400">
						Some of the projects are from work and some are on my own time.
					</p>
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
