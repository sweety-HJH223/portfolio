'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '@/data/projects';
import { GitHubIcon } from '@/components/social-icons';


interface ProjectDetailsProps {
  project: Project;
  previousProject: Project | null;
  nextProject: Project | null;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  previousProject,
  nextProject,
}) => {
  const router = useRouter();

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Projects</span>
      </button>

      {/* Project Header */}
      <div className="flex items-center gap-4">
        <span className="text-5xl">{project.icon}</span>
        <h1 className="text-4xl font-bold text-foreground">{project.name}</h1>
        {project.featured && (
          <span className="ml-2 px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Project Image (Placeholder) */}
      <div className="w-full h-64 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xl">
        {project.image ? (
          <img src={project.image} alt={project.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span>Screenshot/Image Placeholder</span>
        )}
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
      </section>

      {/* What It Does */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">What It Does</h2>
        <ul className="list-none space-y-2">
          {project.whatItDoes.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary mt-1">✅</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Challenges & Solutions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Challenges & Solutions</h2>
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Challenge:</span> {project.challengesSolutions.challenge}
          </p>
          <p className="text-muted-foreground mt-2">
            <span className="font-semibold text-foreground">Solution:</span> {project.challengesSolutions.solution}
          </p>
        </div>
      </section>

      {/* What I Learned */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">What I Learned</h2>
        <p className="text-muted-foreground leading-relaxed">{project.learned}</p>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* GitHub + Live Demo Buttons */}
      <div className="flex gap-4 mt-8">
        {project.github && (
          <a
            href={`https://github.com/yourusername/${project.slug}`} // Placeholder for GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25"
          >
            <GitHubIcon className="w-5 h-5" />
            GitHub Repo
          </a>
        )}
        {project.liveDemo && (
          <a
            href={`https://${project.slug}.yourdomain.com`} // Placeholder for Live Demo link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/70 transition-all duration-200 border border-border"
          >
            <ExternalLink className="w-5 h-5" />
            Live Demo
          </a>
        )}
      </div>

      {/* Previous/Next Navigation */}
      <div className="flex justify-between mt-12 pt-8 border-t border-border">
        {previousProject ? (
          <Link
            href={`/projects/${previousProject.slug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">{previousProject.name}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-sm font-medium">{nextProject.name}</span>
            <ArrowLeft className="w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
