import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectDetails from '@/components/ProjectDetails'; // This component will be created next

interface ProjectPageProps {
  params: {
    'project-name': string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    'project-name': project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params['project-name']);

  if (!project) {
    notFound();
  }

  // Find previous and next projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <ProjectDetails
          project={project}
          previousProject={previousProject}
          nextProject={nextProject}
        />
      </div>
    </div>
  );
}
