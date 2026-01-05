"use client";
import type Project from "@/types/Project";
import { ArrowDown, ArrowUp, StarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const truncateLength = 200;

const TextWithSeeMore = ({ text }: { text: string }): React.ReactElement => {
	const [isTruncated, setIsTruncated] = useState(true);
	const resultString = isTruncated ? text.slice(0, truncateLength) : text;

	const toggleIsTruncated = (): void => {
		setIsTruncated(!isTruncated);
	};

	return (
		<div
			className={
				"flex flex-col items-start justify-start w-full space-y-4 text-left"
			}
		>
			<div className={"flex flex-col items-start justify-start w-full"}>
				<div className="text-base font-medium leading-6 text-zinc-500 mb-2">
					{resultString +
						(isTruncated && text.length > truncateLength ? "..." : "")}
				</div>
				{text.length > truncateLength && (
					<div className="flex flex-row items-center justify-center w-full">
						<button
							type="button"
							className="text-sm font-medium leading-6 text-zinc-500"
							onClick={toggleIsTruncated}
						>
							{isTruncated ? <ArrowDown /> : <ArrowUp />}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const OrangeStar = (): React.ReactElement => (
	<StarIcon color={"orange"} fill={"orange"} className="ml-1 w-4 h-4" />
);

const TestimonialsView = ({
	project,
}: {
	project: Project;
}): React.ReactElement => {
	if (!project || !project.testimonials || !project.testimonials.length)
		return <div />;

	return (
		<div className={"space-y-4"}>
			<h2>Testimonials</h2>
			<div>
				You can find all the testimonials on my{" "}
				<Link
					target="_blank"
					key={"Malt profile"}
					href={"https://www.malt.fr/profile/aurelienvandaele"}
				>
					malt profile
				</Link>
			</div>
			{project.testimonials.map((testimonial, index) => (
				<div
					key={index}
					className="flex flex-col items-center justify-center w-full mx-auto space-y-4 text-center md:space-y-0 md:space-x-4 md:flex-row md:items-start border border-zinc-400 rounded-md px-6 py-4"
				>
					<div className="flex flex-col items-start w-full">
						<div
							className={
								"flex flex-row items-center justify-between w-full mb-4"
							}
						>
							<div className={"flex flex-row items-center justify-between"}>
								<div className="text-lg font-medium leading-6 text-zinc-500 mr-2">
									{testimonial.name}
								</div>
								<div className={"flex flex-row items-center justify-center"}>
									{[0, 1, 2, 3, 4].map((key) => (
										<OrangeStar key={key} />
									))}
								</div>
							</div>
							<div className="text-lg font-medium leading-6 text-zinc-500">
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(testimonial.date),
								)}
							</div>
						</div>
						<TextWithSeeMore text={testimonial.text} />
					</div>
				</div>
			))}
		</div>
	);
};

export default TestimonialsView;
