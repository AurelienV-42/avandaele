import { Header } from "@/app/components/header/header";
import { Mdx } from "@/app/components/mdx";
import TestimonialsView from "@/app/projects/[slug]/TestimonialsView";
import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import "./mdx.css";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
        <TestimonialsView project={project} />
      </article>
    </div>
  );
}