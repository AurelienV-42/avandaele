"use client";
import { Navigation } from "../components/nav";
import React from "react";
import {

allMes}from "contentlayer/generated";
import {Header} from "@/app/components/header/header";
import {Mdx} from "@/app/components/mdx";
import {notFound} from "next/navigation";

export default function Example() {
	const project = allMes[0];
	console.log(project);

	if (!project) {
		notFound();
	}

	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation/>
			<div className="bg-zinc-50 min-h-screen">
				<Header project={project} views={0} />

				<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
					<Mdx code={project.body.code} />
				</article>
			</div>
		</div>
	);
}
