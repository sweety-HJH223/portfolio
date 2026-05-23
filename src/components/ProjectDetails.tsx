'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '@/data/projects';
import { GitHubIcon } from '@/components/social-icons';
import { useLanguage } from '@/context/LanguageContext';

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
  const { language, getText } = useLanguage();

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
  const getLearned = (p: Project) => {
    return (language === 'ko' && p.learnedKo) ? p.learnedKo : p.learned;
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">{language === 'ko' ? '프로젝트로 돌아가기' : 'Back to Projects'}</span>
      </button>

      {/* Project Header */}
      <div className="flex items-center gap-4">
        <span className="text-5xl">{project.icon}</span>
        <h1 className="text-4xl font-bold text-foreground">{getProjectName(project)}</h1>
        {project.featured && (
          <span className="ml-2 px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
            ⭐ {language === 'ko' ? '추천' : 'Featured'}
          </span>
        )}
      </div>

      {/* Project Image (Placeholder) */}
      <div className="w-full h-64 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xl">
        {project.image ? (
          <img src={project.image} alt={getProjectName(project)} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span>{language === 'ko' ? '스크린샷/이미지 플레이스홀더' : 'Screenshot/Image Placeholder'}</span>
        )}
      </div>

      {/* Video Support */}
      {project.videoUrl && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '데모 영상' : 'Demo Video'}</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-border shadow-lg">
            <video
              controls
              className="w-full h-full object-cover"
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      )}

      {/* Project Images */}
      {project.images && project.images.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '프로젝트 갤러리' : 'Project Gallery'}</h2>
          <div className="columns-1 md:columns-2 gap-4 space-y-4">
            {project.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${getProjectName(project)} screenshot ${index + 1}`} 
                className="w-full rounded-lg shadow-md break-inside-avoid hover:scale-[1.02] transition-transform duration-300" 
              />
            ))}
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '개요' : 'Overview'}</h2>
        <p className="text-muted-foreground leading-relaxed">{getProjectOverview(project)}</p>
      </section>

      {/* What It Does */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '주요 기능' : 'What It Does'}</h2>
        <ul className="list-none space-y-2">
          {getProjectWhatItDoes(project).map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary mt-1">✅</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Challenges & Solutions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '도전 과제 및 해결 방법' : 'Challenges & Solutions'}</h2>
        {project.challengesSolutions.map((cs, index) => (
          <div key={index} className="bg-secondary p-4 rounded-lg">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{language === 'ko' ? `도전 과제 ${index + 1}:` : `Challenge ${index + 1}:`}</span> {getChallenge(cs)}
            </p>
            <p className="text-muted-foreground mt-2">
              <span className="font-semibold text-foreground">{language === 'ko' ? '해결 방법:' : 'Solution:'}</span> {getSolution(cs)}
            </p>
          </div>
        ))}
      </section>

      {/* What I Learned */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '배운 점' : 'What I Learned'}</h2>
        <p className="text-muted-foreground leading-relaxed">{getLearned(project)}</p>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '기술 스택' : 'Tech Stack'}</h2>
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

      {/* Case Study Report */}
      {project.caseStudy && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '케이스 스터디 보고서' : 'Case Study Report'}</h2>
          <div className="grid gap-6">
            <div className="bg-secondary/30 p-6 rounded-2xl border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="text-primary text-xl">❓</span> {language === 'ko' ? '문제점' : 'The Problem'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {(language === 'ko' && project.caseStudy.problemKo) ? project.caseStudy.problemKo : project.caseStudy.problem}
              </p>
            </div>
            <div className="bg-secondary/30 p-6 rounded-2xl border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="text-primary text-xl">🛠️</span> {language === 'ko' ? '접근 방식' : 'My Approach'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {(language === 'ko' && project.caseStudy.approachKo) ? project.caseStudy.approachKo : project.caseStudy.approach}
              </p>
            </div>
            <div className="bg-secondary/30 p-6 rounded-2xl border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="text-primary text-xl">✅</span> {language === 'ko' ? '결과' : 'The Result'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {(language === 'ko' && project.caseStudy.resultKo) ? project.caseStudy.resultKo : project.caseStudy.result}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PDF Case Study Link */}
      {project.caseStudyPdfUrl && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">{language === 'ko' ? '케이스 스터디 PDF' : 'Case Study PDF'}</h2>
          <a
            href={project.caseStudyPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-500/25"
          >
            <span className="text-xl">📄</span>
            {language === 'ko' ? '케이스 스터디 PDF 보기' : 'View Case Study PDF'}
          </a>
        </section>
      )
      }

      {/* GitHub + Live Demo + Case Study Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25"
          >
            <GitHubIcon />
            {language === 'ko' ? '소스 코드 보기' : 'View Source Code'}
          </a>
        )}
        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/70 transition-all duration-200 border border-border shadow-sm"
          >
            <ExternalLink className="w-5 h-5" />
            {language === 'ko' ? '라이브 데모 실행' : 'Launch Live Demo'}
          </a>
        )}
        {project.fullCaseStudyUrl && !project.caseStudyPdfUrl && (
          <a
            href={project.fullCaseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-500/25"
          >
            <span className="text-xl">📄</span>
            {language === 'ko' ? '전체 케이스 스터디 읽기 (50+ 페이지)' : 'Read Full Case Study (50+ Pages)'}
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
            <span className="text-sm font-medium">{getProjectName(previousProject)}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-sm font-medium">{getProjectName(nextProject)}</span>
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
