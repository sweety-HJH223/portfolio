import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import ProjectDetails from '@/components/ProjectDetails';

interface ProjectPageProps {
  params: Promise<{
    'project-name': string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    'project-name': project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { 'project-name': slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study | SweetyCodes`,
    description: project.overview,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { 'project-name': slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen text-foreground pb-8 pt-28">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ProjectDetails
          project={project}
          previousProject={previousProject}
          nextProject={nextProject}
        />
      </div>
    </div>
  );
}
