import { Card } from "@/app/components/card";
import { Navigation } from "@/app/components/nav";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import Malt from "@/public/icons/Malt";
import { Linkedin, Mail } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

type Props = {
	params: Promise<{ locale: Locale }>;
};

type Social = {
	icon: ReactNode;
	href: string;
	label: string;
	handle: string;
};

const BASE_URL = "https://www.avandaele.fr";

const socials: Social[] = [
	{
		icon: <Malt width={20} height={20} />,
		href: "https://www.malt.fr/profile/aurelienvandaele",
		label: "Malt",
		handle: "Aurélien Vandaële",
	},
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/aurelien-vandaele/",
		label: "LinkedIn",
		handle: "aurelien-vandaele",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:aurelienvpro@gmail.com",
		label: "Email",
		handle: "aurelienvpro@gmail.com",
	},
];

export function generateStaticParams(): { locale: Locale }[] {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "contact" });
	const baseUrl = locale === "fr" ? BASE_URL : `${BASE_URL}/en`;

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		alternates: {
			canonical: `${baseUrl}/contact/`,
			languages: {
				fr: `${BASE_URL}/contact/`,
				en: `${BASE_URL}/en/contact/`,
			},
		},
	};
}

const SocialCard = ({ social }: { social: Social }): React.ReactElement => (
	<Card>
		<Link
			href={social.href}
			className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
		>
			<span
				className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
				aria-hidden="true"
			/>
			<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
				{social.icon}
			</span>{" "}
			<div className="z-10 flex flex-col items-center">
				<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display text-center">
					{social.handle}
				</span>
				<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{social.label}
				</span>
			</div>
		</Link>
	</Card>
);

export default async function ContactPage({
	params,
}: Props): Promise<React.ReactElement> {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{socials.map((social, index) => (
						<SocialCard key={index} social={social} />
					))}
				</div>
			</div>
		</div>
	);
}
