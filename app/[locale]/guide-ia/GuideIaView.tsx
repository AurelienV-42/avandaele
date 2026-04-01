"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

// iTerm2-inspired palette
const C = {
	bg: "#1a1b26",
	bgPanel: "#1f2133",
	bgHover: "#252740",
	border: "#2d2f45",
	prompt: "#50fa7b", // green arrow
	cyan: "#8be9fd", // filenames, paths
	magenta: "#ff79c6", // keywords
	yellow: "#f1fa8c", // values, prices
	white: "#f8f8f2", // main text
	muted: "#6272a4", // comments
	red: "#ff5555", // strikethrough / before
	orange: "#ffb86c", // accent
} as const;

const PROMO_END = new Date("2026-04-15T23:59:59+02:00");
const STRIPE_URL =
	"https://buy.stripe.com/eVq4gy1Cn9uYdxR8z1g7e00?prefilled_promo_code=EARLY";

function useCountdown(): {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
} {
	const [timeLeft, setTimeLeft] = useState(() =>
		Math.max(0, PROMO_END.getTime() - Date.now()),
	);

	useEffect(() => {
		const interval = setInterval(
			() => setTimeLeft(Math.max(0, PROMO_END.getTime() - Date.now())),
			1000,
		);
		return () => clearInterval(interval);
	}, []);

	return {
		days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
		hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
		minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
		seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
	};
}

function Prompt(): React.ReactElement {
	return <span style={{ color: C.prompt }}>→</span>;
}

function Blink(): React.ReactElement {
	return (
		<span
			className="inline-block w-[10px] h-[1.1em] ml-1 align-middle"
			style={{
				backgroundColor: C.white,
				animation: "blink 1.2s step-end infinite",
			}}
		/>
	);
}

type FaqItem = { q: string; a: string };

function FaqAccordion({ items }: { items: FaqItem[] }): React.ReactElement {
	const [open, setOpen] = useState<number | null>(null);
	return (
		<div>
			{items.map((item, i) => (
				<div
					key={i}
					style={{ borderBottom: `1px solid ${C.border}` }}
					className="last:border-b-0"
				>
					<button
						type="button"
						className="w-full flex items-start justify-between py-5 text-left gap-6 group"
						onClick={() => setOpen(open === i ? null : i)}
					>
						<div className="flex items-start gap-3">
							<Prompt />
							<span
								style={{ color: C.cyan }}
								className="text-sm group-hover:brightness-125 transition-all"
							>
								{item.q}
							</span>
						</div>
						<span
							style={{ color: C.muted }}
							className={`text-sm shrink-0 transition-transform duration-200 mt-0.5 ${open === i ? "rotate-45" : ""}`}
						>
							[+]
						</span>
					</button>
					{open === i && (
						<p
							className="pb-5 text-sm leading-relaxed pl-6"
							style={{ color: C.muted }}
						>
							{item.a}
						</p>
					)}
				</div>
			))}
		</div>
	);
}

type SolutionItem = { icon: string; title: string; desc: string };

function SectionHeader({ cmd }: { cmd: string }): React.ReactElement {
	return (
		<div className="flex items-center gap-3 mb-6">
			<Prompt />
			<span style={{ color: C.muted }} className="text-sm">
				{cmd}
			</span>
		</div>
	);
}

export default function GuideIaView(): React.ReactElement {
	const t = useTranslations("guide");
	const countdown = useCountdown();
	const pricingRef = useRef<HTMLDivElement>(null);

	const solutionItems = t.raw("solution.items") as SolutionItem[];
	const chapterItems = t.raw("chapters.items") as string[];
	const faqItems = t.raw("faq.items") as FaqItem[];

	const pad = (n: number): string => String(n).padStart(2, "0");

	const scrollToPricing = (): void => {
		pricingRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap');
				@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
			`}</style>

			<div
				className="min-h-screen"
				style={{
					backgroundColor: C.bg,
					color: C.white,
					fontFamily: "'JetBrains Mono', monospace",
				}}
			>
				{/* Nav */}
				<nav
					className="fixed top-0 inset-x-0 z-50 border-b"
					style={{ backgroundColor: C.bgPanel, borderColor: C.border }}
				>
					<div className="max-w-3xl mx-auto px-8 h-13 flex items-center justify-between h-12">
						<div className="flex items-center gap-2 text-sm">
							<span style={{ color: C.muted }}>~/</span>
							<Link
								href="/"
								style={{ color: C.cyan }}
								className="hover:brightness-125 transition-all"
							>
								avandaele.fr
							</Link>
							<span style={{ color: C.muted }}>/</span>
							<span style={{ color: C.magenta }}>guide-ia</span>
						</div>
						<button
							type="button"
							onClick={scrollToPricing}
							className="text-xs px-4 py-1.5 border transition-all hover:brightness-125"
							style={{ borderColor: C.prompt, color: C.prompt }}
						>
							→ {t("hero.pricePromo")}
						</button>
					</div>
				</nav>

				<main className="max-w-3xl mx-auto px-8 pt-28 pb-32">
					{/* ── Hero window ── */}
					<div
						className="mb-20 rounded-lg overflow-hidden border"
						style={{ borderColor: C.border }}
					>
						{/* Window chrome */}
						<div
							className="flex items-center gap-2 px-5 py-3 border-b"
							style={{ backgroundColor: C.bgPanel, borderColor: C.border }}
						>
							<span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
							<span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
							<span className="w-3 h-3 rounded-full bg-[#28c840]" />
							<span className="text-xs ml-3" style={{ color: C.muted }}>
								aurelien — guide-ia.sh — 80×24
							</span>
						</div>

						<div className="p-8">
							{/* comment */}
							<p className="text-xs mb-6" style={{ color: C.muted }}>
								# {t("hero.badge").toUpperCase()} — {t("hero.discount")} OFF
							</p>

							{/* title */}
							<div className="flex items-start gap-3 mb-2">
								<Prompt />
								<h1
									className="text-2xl sm:text-4xl font-bold leading-tight tracking-tight"
									style={{ color: C.white }}
								>
									{t("hero.title").split("\n").join(" ")}
									<Blink />
								</h1>
							</div>

							<p
								className="text-sm leading-relaxed pl-6 mb-10"
								style={{ color: C.muted, maxWidth: "52ch" }}
							>
								{t("hero.subtitle")}
							</p>

							{/* countdown */}
							<div className="flex items-center gap-3 pl-6 mb-2">
								<Prompt />
								<span className="text-xs" style={{ color: C.muted }}>
									countdown --promo
								</span>
							</div>
							<div className="flex items-center gap-1 pl-12 mb-10 text-xl font-bold tabular-nums">
								<span style={{ color: C.yellow }}>{pad(countdown.days)}</span>
								<span className="text-xs mx-1" style={{ color: C.muted }}>
									d
								</span>
								<span style={{ color: C.yellow }}>{pad(countdown.hours)}</span>
								<span className="text-xs mx-1" style={{ color: C.muted }}>
									h
								</span>
								<span style={{ color: C.yellow }}>
									{pad(countdown.minutes)}
								</span>
								<span className="text-xs mx-1" style={{ color: C.muted }}>
									m
								</span>
								<span style={{ color: C.yellow }}>
									{pad(countdown.seconds)}
								</span>
								<span className="text-xs mx-1" style={{ color: C.muted }}>
									s
								</span>
							</div>

							{/* price + CTA */}
							<div className="flex items-center gap-3 pl-6 mb-3">
								<Prompt />
								<span className="text-xs" style={{ color: C.muted }}>
									npm install guide-ia
								</span>
							</div>
							<div
								className="ml-6 p-5 rounded border flex flex-wrap items-center justify-between gap-4"
								style={{ backgroundColor: C.bgHover, borderColor: C.border }}
							>
								<div>
									<p
										className="text-xs line-through mb-1"
										style={{ color: C.muted }}
									>
										{t("hero.priceNormal")}
									</p>
									<p className="text-3xl font-bold" style={{ color: C.yellow }}>
										{t("hero.pricePromo")}
									</p>
								</div>
								<a
									href={STRIPE_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm font-bold px-7 py-3 rounded transition-all hover:brightness-110"
									style={{ backgroundColor: C.prompt, color: C.bg }}
								>
									→ {t("hero.cta")}
								</a>
							</div>
							<p className="text-xs mt-3 pl-6" style={{ color: C.muted }}>
								# {t("hero.ctaSub")}
							</p>
						</div>
					</div>

					{/* ── Stats ── */}
					<div
						className="grid grid-cols-3 rounded border mb-20"
						style={{ borderColor: C.border }}
					>
						{[
							{ value: t("proof.stat1Value"), label: t("proof.stat1Label") },
							{ value: t("proof.stat2Value"), label: t("proof.stat2Label") },
							{ value: t("proof.stat3Value"), label: t("proof.stat3Label") },
						].map((stat, i) => (
							<div
								key={i}
								className="py-6 text-center border-r last:border-r-0"
								style={{ borderColor: C.border }}
							>
								<div
									className="text-2xl font-bold mb-1"
									style={{ color: C.cyan }}
								>
									{stat.value}
								</div>
								<div className="text-xs" style={{ color: C.muted }}>
									{stat.label}
								</div>
							</div>
						))}
					</div>

					{/* ── Problem ── */}
					<section className="mb-20">
						<SectionHeader cmd="cat problem.txt" />
						<div className="pl-6 border-l-2" style={{ borderColor: C.magenta }}>
							<h2
								className="text-base font-bold mb-4"
								style={{ color: C.white }}
							>
								{t("problem.title")}
							</h2>
							<p className="text-sm leading-relaxed" style={{ color: C.muted }}>
								{t("problem.body")}
							</p>
						</div>
					</section>

					{/* ── Solution ── */}
					<section className="mb-20">
						<SectionHeader cmd="ls --modules" />
						<div className="space-y-3 pl-6">
							{solutionItems.map((item, i) => (
								<div
									key={item.title}
									className="flex gap-4 items-start p-4 rounded border transition-all hover:brightness-110 cursor-default"
									style={{ backgroundColor: C.bgPanel, borderColor: C.border }}
								>
									<span
										className="text-xs mt-0.5 shrink-0 tabular-nums w-6"
										style={{ color: C.muted }}
									>
										[{i + 1}]
									</span>
									<div>
										<p
											className="text-sm font-bold mb-1"
											style={{ color: C.cyan }}
										>
											{item.title}
										</p>
										<p
											className="text-xs leading-relaxed"
											style={{ color: C.muted }}
										>
											{item.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* ── Results ── */}
					<section className="mb-20">
						<SectionHeader cmd="diff before.log after.log" />
						<div
							className="pl-6 rounded border overflow-hidden"
							style={{ borderColor: C.border }}
						>
							{[
								{
									title: t("results.item1Title"),
									before: t("results.item1Before"),
									after: t("results.item1After"),
								},
								{
									title: t("results.item2Title"),
									before: t("results.item2Before"),
									after: t("results.item2After"),
								},
								{
									title: t("results.item3Title"),
									before: t("results.item3Before"),
									after: t("results.item3After"),
								},
								{
									title: t("results.item4Title"),
									before: t("results.item4Before"),
									after: t("results.item4After"),
								},
							].map((item, i) => (
								<div
									key={i}
									className="grid grid-cols-[1fr_auto_auto] gap-6 items-center px-5 py-4 border-b last:border-b-0 text-sm"
									style={{ borderColor: C.border }}
								>
									<span style={{ color: C.white }}>{item.title}</span>
									<span className="line-through" style={{ color: C.red }}>
										- {item.before}
									</span>
									<span className="font-bold" style={{ color: C.prompt }}>
										+ {item.after}
									</span>
								</div>
							))}
						</div>
					</section>

					{/* ── Living guide ── */}
					<section className="mb-20">
						<div
							className="flex gap-4 items-start p-5 rounded border"
							style={{
								backgroundColor: C.bgPanel,
								borderColor: C.orange,
								borderLeftWidth: 3,
							}}
						>
							<span style={{ color: C.orange }} className="text-lg shrink-0">
								↻
							</span>
							<div>
								<p
									className="text-sm font-bold mb-2"
									style={{ color: C.orange }}
								>
									{t("living.title")}
								</p>
								<p
									className="text-sm leading-relaxed"
									style={{ color: C.muted }}
								>
									{t("living.body")}
								</p>
							</div>
						</div>
					</section>

					{/* ── Chapters ── */}
					<section className="mb-20">
						<SectionHeader cmd="tree --chapters" />
						<div
							className="pl-6 p-5 rounded border text-sm space-y-2.5"
							style={{ backgroundColor: C.bgPanel, borderColor: C.border }}
						>
							{chapterItems.map((chapter, i) => (
								<div key={chapter} className="flex gap-3 items-baseline">
									<span
										className="tabular-nums text-xs w-6 shrink-0"
										style={{ color: C.muted }}
									>
										{String(i + 1).padStart(2, "0")}.
									</span>
									<span style={{ color: C.white }}>{chapter}</span>
								</div>
							))}
						</div>
					</section>

					{/* ── Testimonials ── */}
					<section className="mb-20">
						<SectionHeader cmd="cat reviews.log" />
						<div className="pl-6 space-y-4">
							{[
								{
									name: t("testimonials.t1Name"),
									role: t("testimonials.t1Role"),
									text: t("testimonials.t1Text"),
								},
								{
									name: t("testimonials.t2Name"),
									role: t("testimonials.t2Role"),
									text: t("testimonials.t2Text"),
								},
							].map((testimonial) => (
								<div
									key={testimonial.name}
									className="p-5 rounded border"
									style={{ backgroundColor: C.bgPanel, borderColor: C.border }}
								>
									<p
										className="text-sm leading-relaxed mb-4"
										style={{ color: C.white }}
									>
										&ldquo;{testimonial.text}&rdquo;
									</p>
									<p className="text-xs" style={{ color: C.muted }}>
										— <span style={{ color: C.cyan }}>{testimonial.name}</span>{" "}
										<span style={{ color: C.muted }}>
											{"// "}
											{testimonial.role}
										</span>
									</p>
								</div>
							))}
						</div>
					</section>

					{/* ── Author ── */}
					<section className="mb-20">
						<SectionHeader cmd="whoami" />
						<div
							className="pl-6 p-5 rounded border"
							style={{ backgroundColor: C.bgPanel, borderColor: C.border }}
						>
							<p
								className="text-sm font-bold mb-0.5"
								style={{ color: C.magenta }}
							>
								Aurélien Vandaële
							</p>
							<p className="text-xs mb-4" style={{ color: C.muted }}>
								{"// "}Freelance React Native · Super Malter 5★
							</p>
							<p className="text-sm leading-relaxed" style={{ color: C.muted }}>
								{t("author.body")}
							</p>
						</div>
					</section>

					{/* ── FAQ ── */}
					<section className="mb-20">
						<SectionHeader cmd="cat faq.md" />
						<div className="pl-6">
							<FaqAccordion items={faqItems} />
						</div>
					</section>

					{/* ── Pricing CTA ── */}
					<section ref={pricingRef}>
						<div
							className="rounded-lg overflow-hidden border"
							style={{ borderColor: C.prompt }}
						>
							{/* Window chrome */}
							<div
								className="flex items-center gap-2 px-5 py-3 border-b"
								style={{ backgroundColor: C.bgPanel, borderColor: C.border }}
							>
								<span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
								<span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
								<span className="w-3 h-3 rounded-full bg-[#28c840]" />
								<span className="text-xs ml-3" style={{ color: C.muted }}>
									checkout.sh
								</span>
							</div>

							<div className="p-8">
								<div className="flex items-center gap-3 mb-6">
									<Prompt />
									<span className="text-xs" style={{ color: C.muted }}>
										npm install guide-ia --save
									</span>
								</div>

								<p
									className="text-xl font-bold pl-6 mb-1"
									style={{ color: C.white }}
								>
									{t("pricing.title")}
								</p>
								<p className="text-xs pl-6 mb-8" style={{ color: C.muted }}>
									# {t("pricing.guarantee")}
								</p>

								{/* Countdown */}
								<div className="flex items-center gap-1 pl-6 mb-8 text-lg font-bold tabular-nums">
									<span className="text-xs mr-3" style={{ color: C.muted }}>
										{t("hero.timerLabel")}
									</span>
									<span style={{ color: C.yellow }}>{pad(countdown.days)}</span>
									<span className="text-xs mx-1" style={{ color: C.muted }}>
										d
									</span>
									<span style={{ color: C.yellow }}>
										{pad(countdown.hours)}
									</span>
									<span className="text-xs mx-1" style={{ color: C.muted }}>
										h
									</span>
									<span style={{ color: C.yellow }}>
										{pad(countdown.minutes)}
									</span>
									<span className="text-xs mx-1" style={{ color: C.muted }}>
										m
									</span>
									<span style={{ color: C.yellow }}>
										{pad(countdown.seconds)}
									</span>
									<span className="text-xs mx-1" style={{ color: C.muted }}>
										s
									</span>
								</div>

								<div className="flex items-center gap-4 pl-6 mb-8">
									<span
										className="text-sm line-through"
										style={{ color: C.muted }}
									>
										{t("hero.priceNormal")}
									</span>
									<span
										className="text-4xl font-bold"
										style={{ color: C.yellow }}
									>
										{t("hero.pricePromo")}
									</span>
									<span
										className="text-xs font-bold px-2 py-0.5 rounded"
										style={{ backgroundColor: C.prompt, color: C.bg }}
									>
										{t("hero.discount")}
									</span>
								</div>

								<div className="pl-6">
									<a
										href={STRIPE_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-block w-full text-center font-bold py-4 rounded transition-all hover:brightness-110 text-sm"
										style={{ backgroundColor: C.prompt, color: C.bg }}
									>
										→ {t("hero.cta")}
									</a>
								</div>
							</div>
						</div>
					</section>
				</main>

				<footer
					className="border-t py-10 text-center"
					style={{ borderColor: C.border }}
				>
					<Link
						href="/"
						className="text-xs hover:brightness-125 transition-all"
						style={{ color: C.muted }}
					>
						cd ..
					</Link>
				</footer>
			</div>
		</>
	);
}
