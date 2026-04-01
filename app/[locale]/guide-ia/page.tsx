import { routing, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GuideIaView from "./GuideIaView";

type Props = {
	params: Promise<{ locale: Locale }>;
};

const BASE_URL = "https://www.avandaele.fr";

export function generateStaticParams(): { locale: Locale }[] {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "guide" });
	const baseUrl = locale === "fr" ? BASE_URL : `${BASE_URL}/en`;

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		alternates: {
			canonical: `${baseUrl}/guide-ia/`,
			languages: {
				fr: `${BASE_URL}/guide-ia/`,
				en: `${BASE_URL}/en/guide-ia/`,
			},
		},
		openGraph: {
			title: t("metaTitle"),
			description: t("metaDescription"),
			url: `${baseUrl}/guide-ia/`,
			type: "website",
		},
	};
}

export default async function GuideIaPage({
	params,
}: Props): Promise<React.ReactElement> {
	const { locale } = await params;
	setRequestLocale(locale);

	return <GuideIaView />;
}
