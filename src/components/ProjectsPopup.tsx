'use client';

import React, { useState } from 'react';
import { projects, ProjectCategory, Project } from '@/data/projects';
import { XIcon, ChevronLeft, Globe } from 'lucide-react';
import { GitHubIcon } from './social-icons';
import { Lightbox } from './Lightbox';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsPopup: React.FC<ProjectsPopupProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { language, getText } = useLanguage();

  if (!isOpen) return null;

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const categories: ProjectCategory[] = ['All', 'Frontend', 'Python', 'AI', 'Automation'];

  const getProjectName = (p: Project) => {
    return (language === 'ko' && p.nameKo) ? p.nameKo : p.name;
  };
  const getProjectOverview = (p: Project) => {
    return (language === 'ko' && p.overviewKo) ? p.overviewKo : p.overview;
  };
  const getProjectWhatItDoes = (p: Project) => {
    return (language === 'ko' && p.whatItDoesKo) ? p.whatItDoesKo : p.whatItDoes;
  };
  const getChallenge = (cs: any) => {
    return (language === 'ko' && cs.challengeKo) ? cs.challengeKo : cs.challenge;
  };
  const getSolution = (cs: any) => {
    return (language === 'ko' && cs.solutionKo) ? cs.solutionKo : cs.solution;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card text-card-foreground rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            {selectedProject ? (
              <button onClick={() => setSelectedProject(null)} className="hover:text-foreground">
                <ChevronLeft />
              </button>
            ) : null}
            {selectedProject ? getProjectName(selectedProject) : getText('Projects')}
          </h2>
          <button onClick={() => { setSelectedProject(null); onClose(); }} className="text-muted-foreground hover:text-foreground">
            <XIcon size={24} />
          </button>
        </div>

        {/* Detailed View */}
        {selectedProject ? (
          <div className="p-8 overflow-y-auto custom-scrollbar">
            <p className="text-muted-foreground mb-6 text-lg">{getProjectOverview(selectedProject)}</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {selectedProject.challengesSolutions.map((cs, i) => (
                <div key={i} className={`p-5 rounded-xl ${i % 2 === 0 ? 'bg-secondary/30' : 'bg-primary/10'}`}>
                  <h4 className="font-bold text-primary mb-2">{language === 'ko' ? '도전 과제' : (i === 0 ? 'Challenge' : 'Challenge ' + (i + 1))}</h4>
                  <p className="text-sm mb-2">{getChallenge(cs)}</p>
                  <h4 className="font-bold text-primary mb-2">{language === 'ko' ? '해결 방법' : 'Solution'}</h4>
                  <p className="text-sm">{getSolution(cs)}</p>
                </div>
              ))}
            </div>

            {/* Project Gallery */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">{language === 'ko' ? '프로젝트 갤러리' : 'Project Gallery'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.images.map((img, index) => (
                    <img key={index} src={img} alt={`${getProjectName(selectedProject)} screenshot ${index + 1}`} className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setLightboxImage(img)} />
                  ))}
                </div>
              </div>
            )}

            {lightboxImage && (
              <Lightbox imageSrc={lightboxImage} alt="Project screenshot" onClose={() => setLightboxImage(null)} />
            )}

            <h4 className="font-bold text-lg mb-4">{language === 'ko' ? '주요 기능' : 'Key Features'}</h4>
            <ul className="list-disc pl-5 mb-8 space-y-2 text-sm text-muted-foreground">
              {getProjectWhatItDoes(selectedProject).map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.techStack.map(t => (
                <span key={t} className="px-3 py-1 bg-secondary rounded-md text-xs font-medium">{t}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg font-bold hover:opacity-90">
                  <GitHubIcon className="w-[18px] h-[18px]"/> GitHub
                </a>
              )}
              {selectedProject.liveDemoUrl && (
                <a href={selectedProject.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-bold hover:bg-primary/10">
                  <Globe className="w-[18px] h-[18px]"/> {language === 'ko' ? '라이브' : 'Live'}
                </a>
              )}
              {selectedProject.caseStudyPdfUrl && (
                <a href={selectedProject.caseStudyPdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600">
                  📄 {language === 'ko' ? '케이스 스터디 PDF' : 'Case Study PDF'}
                </a>
              )}
            </div>
          </div>
        ) : (
          /* List View */
          <>
            <div className="p-4 border-b border-border flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary'}`}>
                  {cat === 'All' && language === 'ko' ? '전체' : cat}
                </button>
              ))}
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar">
              {filteredProjects.map(project => (
                <div key={project.slug} onClick={() => setSelectedProject(project)} className="p-4 bg-secondary rounded-xl hover:border-primary border border-transparent transition-all cursor-pointer group">
                  <span className="text-2xl mb-2 block">{project.icon}</span>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary">{getProjectName(project)}</h3>
                  <p className="text-xs text-muted-foreground truncate">{getProjectOverview(project)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsPopup;
