"use client";
import React, { useEffect, useRef, useState } from "react";
import Links from "@/app/components/header/links";
import Project from "@/types/Project";
import HeaderImage from "@/app/components/header/headerImage";
import { ArrowLeft, Eye, Github, Linkedin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Malt from "@/public/icons/Malt";
import { LanguageSwitcher } from "@/app/components/language-switcher";

type Props = {
	project: Project;
};

export const Header: React.FC<Props> = ({ project }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-white/10  border-zinc-200 lg:border-transparent"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							target="_blank"
							href="https://www.linkedin.com/in/aurelien-vandaele/"
						>
							<Linkedin
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/aurelienv-42">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>

						<Link
							target="_blank"
							href="https://www.malt.fr/profile/aurelienvandaele"
						>
							<Malt
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
						<LanguageSwitcher
							className={`px-2 py-1 text-sm font-medium duration-200 disabled:opacity-50 ${
								isIntersecting
									? "text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
							}`}
						/>
					</div>

					<Link
						href="/projects"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden  py-16 sm:py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						{project.icon && (
							<img
								src={project.icon}
								alt=""
								className="w-16 h-16 mx-auto mb-4 rounded-2xl object-cover"
							/>
						)}
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{project.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300">
							{project.description}
						</p>
					</div>

					<Links project={project} />
					{project.img && <HeaderImage img={project.img} />}
				</div>
			</div>
		</header>
	);
};
