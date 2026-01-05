import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import { routing, type Locale } from "@/i18n/routing";
import { me } from "#site/content";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ locale: Locale }>;
};

export function generateStaticParams(): { locale: Locale }[] {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function MePage({
	params,
}: Props): Promise<React.ReactElement> {
	const { locale } = await params;
	setRequestLocale(locale);

	const meContent = me.find((m) => m.locale === locale) ?? me[0];

	if (!meContent) {
		notFound();
	}

	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="bg-zinc-50 min-h-screen">
				<header className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black">
					<div className="container mx-auto relative isolate overflow-hidden py-16 sm:py-16">
						<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
							<div className="mx-auto max-w-2xl lg:mx-0">
								<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
									{meContent.title}
								</h1>
								<p className="mt-6 text-lg leading-8 text-zinc-300">
									{meContent.description}
								</p>
							</div>
							{meContent.img && (
								<img
									src={meContent.img}
									alt={meContent.title}
									className="mt-8 w-32 h-32 rounded-full object-cover"
								/>
							)}
						</div>
					</div>
				</header>

				<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
					<Mdx code={meContent.content} />
				</article>
			</div>
		</div>
	);
}
