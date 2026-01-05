"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTransition } from "react";

type Props = {
	className?: string;
};

export function LanguageSwitcher({ className }: Props): React.ReactElement {
	const locale = useLocale() as Locale;
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const switchLocale = (): void => {
		const newLocale = locale === "fr" ? "en" : "fr";
		startTransition(() => {
			router.replace(pathname, { locale: newLocale });
		});
	};

	return (
		<button
			type="button"
			onClick={switchLocale}
			disabled={isPending}
			className={
				className ??
				"px-2 py-1 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200 disabled:opacity-50"
			}
		>
			{locale === "fr" ? "EN" : "FR"}
		</button>
	);
}
