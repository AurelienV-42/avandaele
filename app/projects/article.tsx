import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";
import { FC } from "react";

type Props = {
  project: Project;
};

const formatDate = (date: string) => {
  return Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(date));
};

const monthsBetweenTwoDates = (dateStart: string, dateEnd: string) => {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const months = (end.getFullYear() - start.getFullYear()) * 12;
  return months + end.getMonth() - start.getMonth();
};

const period = (dateStart: string, dateEnd?: string) => {
  if (!dateEnd) return "";

  const nbMonths = monthsBetweenTwoDates(dateStart, dateEnd);
  return ` - ${nbMonths} month${nbMonths > 1 ? "s" : ""}`;
};

const displayDate = (dateStart: string, dateEnd?: string) => {
  return `${formatDate(dateStart)}${period(dateStart, dateEnd)}`;
};

export const Article: FC<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-center">
          <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
            {project.dateEnd ? (
              <time dateTime={new Date(project.dateEnd).toISOString()}>
                {displayDate(project.dateStart, project.dateEnd)}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {project.title}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {project.description}
        </p>
      </article>
    </Link>
  );
};
