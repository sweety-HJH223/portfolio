'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { projects, ProjectCategory } from '@/data/projects';
import { XIcon } from 'lucide-react'; // Assuming lucide-react is installed for icons

interface ProjectsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsPopup: React.FC<ProjectsPopupProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<ProjectCategory>('All');

  if (!isOpen) return null;

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const categories: ProjectCategory[] = ['All', 'Frontend', 'Python', 'AI', 'Automation'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card text-card-foreground rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-2xl font-bold text-primary">My Projects</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <XIcon size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-border flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar">
          {filteredProjects.map(project => (
            <Link key={project.slug} href={`/projects/${project.slug}`} onClick={onClose}>
              <div className="flex items-center gap-4 p-4 bg-secondary hover:bg-secondary/70 rounded-lg transition-colors cursor-pointer group">
                <span className="text-3xl transition-transform group-hover:scale-110">{project.icon}</span>
                <span className="text-lg font-medium text-secondary-foreground group-hover:text-primary">
                  {project.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPopup;
