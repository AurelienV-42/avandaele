"use client";
import { LanguageSwitcher } from "@/app/components/language-switcher";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Particles from "../components/particles";

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Aurélien Vandaële",
	url: "https://www.avandaele.fr/",
	jobTitle: "Freelance CTO & Startup Founder",
	sameAs: [
		"https://www.linkedin.com/in/aurelien-vandaele/",
		"https://www.malt.fr/profile/aurelienvandaele",
	],
};

export default function Home(): React.ReactElement {
	const t = useTranslations();

	const routes = [
		{ name: t("nav.me"), href: "/me" },
		{ name: t("nav.projects"), href: "/projects" },
		{ name: t("nav.contact"), href: "/contact" },
	];

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
			/>
			<nav className="my-16 animate-fade-in">
				<ul className="flex items-center justify-center gap-4">
					{routes.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
						>
							{item.name}
						</Link>
					))}
					<LanguageSwitcher />
				</ul>
			</nav>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-8xl whitespace-nowrap bg-clip-text ">
				Aurélien Vandaële
			</h1>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="my-16 text-center animate-fade-in">
				<h2 className="text-sm text-zinc-500 ">{t("home.subtitle")}</h2>
			</div>
		</div>
	);
}
