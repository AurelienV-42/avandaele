import { projects } from "#site/content";
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.avandaele.fr";

export default function sitemap(): MetadataRoute.Sitemap {
	const staticPages = ["/", "/projects/", "/me/", "/contact/"];
	const locales = ["fr", "en"] as const;

	const staticEntries = locales.flatMap((locale) =>
		staticPages.map((page) => ({
			url: locale === "fr" ? `${BASE_URL}${page}` : `${BASE_URL}/en${page}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: page === "/" ? 1 : 0.8,
		})),
	);

	const projectEntries = projects
		.filter((p) => p.published)
		.map((project) => ({
			url:
				project.locale === "fr"
					? `${BASE_URL}/projects/${project.slug}/`
					: `${BASE_URL}/en/projects/${project.slug}/`,
			lastModified: new Date(
				project.dateEnd ?? project.dateStart ?? new Date(),
			),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		}));

	return [...staticEntries, ...projectEntries];
}
