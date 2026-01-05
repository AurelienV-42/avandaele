import { Analytics } from "@/app/components/analytics";
import { routing, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from "next-intl/server";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { notFound } from "next/navigation";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams(): { locale: Locale }[] {
	return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = "https://www.avandaele.fr";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });
	const canonicalUrl = locale === "fr" ? `${BASE_URL}/` : `${BASE_URL}/en/`;

	return {
		title: {
			default: t("title"),
			template: t("template"),
		},
		description: t("description"),
		metadataBase: new URL("https://avandaele.fr"),
		alternates: {
			canonical: canonicalUrl,
			languages: {
				fr: `${BASE_URL}/`,
				en: `${BASE_URL}/en/`,
			},
		},
		openGraph: {
			title: t("title"),
			description: t("ogDescription"),
			url: "https://avandaele.fr",
			siteName: t("siteName"),
			images: [
				{
					url: "https://avandaele.fr/og.png",
					width: 1920,
					height: 1080,
				},
			],
			locale: locale === "fr" ? "fr_FR" : "en_US",
			type: "website",
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		icons: {
			shortcut: "/favicon.png",
		},
	};
}

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default async function LocaleLayout({
	children,
	params,
}: Props): Promise<React.ReactElement> {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();

	return (
		<html
			lang={locale}
			className={[inter.variable, calSans.variable].join(" ")}
		>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				<NextIntlClientProvider messages={messages}>
					<Analytics />
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
