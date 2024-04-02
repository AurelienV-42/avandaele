import Link from "next/link";
import Project from "@/types/Project";
import React from "react";
import { formatDate, period } from "@/utils/computeDates";

type Props = {
  project: Project;
  featured?: boolean;
};

const displayDate = (dateStart?: string, dateEnd?: string) => {
  if (!dateStart) return "";
  return `${formatDate(dateStart)}${period(dateStart, dateEnd)}`;
};

export const Article = ({ project, featured }: Props) => {
  const dateDisplay = project.dateEnd ? (
    <time dateTime={new Date(project.dateEnd).toISOString()}>
      {displayDate(project.dateStart, project.dateEnd)}
    </time>
  ) : (
    <span>SOON</span>
  );

  const articleClass = featured
    ? "relative w-full h-full p-4 md:p-8"
    : "p-4 md:p-8";

  const titleClass = featured
    ? "mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
    : "z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display";

  const descriptionClass = featured
    ? "mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300"
    : "z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200";

  return (
    <Link href={`/projects/${project.slug}`}>
      <article className={articleClass}>
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs text-zinc-100">{dateDisplay}</div>
        </div>

        <h2 id="featured-post" className={titleClass}>
          {project.title}
        </h2>
        <p className={descriptionClass}>{project.description}</p>
      </article>
    </Link>
  );
};
