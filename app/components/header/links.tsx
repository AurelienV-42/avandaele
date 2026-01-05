import Link from "next/link";
import React from "react";
import Project from "@/types/Project";

const getLinks = (project: Project) => {
	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
		});
	}
	if (project.playStoreURL)
		links.push({
			label: "Play Store",
			href: project.playStoreURL,
		});
	if (project.appStoreURL)
		links.push({
			label: "App Store",
			href: project.appStoreURL,
		});
	return links;
};

const Links = ({ project }: { project: Project }) => {
	const links = getLinks(project);

	return (
		<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
			<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
				{links.map((link) => (
					<Link target="_blank" key={link.label} href={link.href}>
						{link.label} <span aria-hidden="true">&rarr;</span>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Links;
