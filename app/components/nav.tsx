"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

type Route = {
	name: string;
	href: string;
};

export const Navigation = (): React.ReactElement => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const t = useTranslations("nav");
	const pathname = usePathname();

	const routes: Route[] = useMemo(
		() => [
			{ name: t("me"), href: "/me" },
			{ name: t("projects"), href: "/projects" },
			{ name: t("contact"), href: "/contact" },
		],
		[t],
	);

	const routesWithoutCurrentRoute = useMemo(
		() => routes.filter((route) => !pathname.includes(route.href)),
		[pathname, routes],
	);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex items-center gap-8">
						{routesWithoutCurrentRoute.map((route, index) => (
							<Link
								key={index}
								href={route.href}
								className="duration-200 text-zinc-400 hover:text-zinc-100"
							>
								{route.name}
							</Link>
						))}
						<LanguageSwitcher />
					</div>

					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};
