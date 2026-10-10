'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Lightbulb,
  ShieldCheck,
  Target,
  Wrench,
  Trophy,
} from 'lucide-react';
import { Project } from '@/data/projects';
import { GitHubIcon } from '@/components/social-icons';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal } from '@/components/fx/Reveal';
import { TiltCard } from '@/components/fx/TiltCard';

interface ProjectDetailsProps {
  project: Project;
  previousProject: Project | null;
  nextProject: Project | null;
}

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
    <span className="h-px w-8 bg-brand-gradient" />
    {children}
  </h2>
);

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, previousProject, nextProject }) => {
  const { language } = useLanguage();
  const ko = language === 'ko';
  const pick = (en?: string, k?: string) => (ko && k ? k : en ?? '');

  const name = (p: Project) => pick(p.name, p.nameKo);
  const whatItDoes = ko && project.whatItDoesKo ? project.whatItDoesKo : project.whatItDoes;

  const caseCards = project.caseStudy
    ? [
        { icon: Target, label: ko ? '문제점' : 'The Problem', text: pick(project.caseStudy.problem, project.caseStudy.problemKo), tone: 'from-rose-400 to-pink-500' },
        { icon: Wrench, label: ko ? '접근 방식' : 'My Approach', text: pick(project.caseStudy.approach, project.caseStudy.approachKo), tone: 'from-violet-500 to-fuchsia-500' },
        { icon: Trophy, label: ko ? '결과' : 'The Result', text: pick(project.caseStudy.result, project.caseStudy.resultKo), tone: 'from-emerald-400 to-cyan-500' },
      ]
    : [];

  const pdfUrl = project.caseStudyPdfUrl ?? project.fullCaseStudyUrl;

  return (
    <div className="space-y-16 pb-16">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {ko ? '프로젝트로 돌아가기' : 'Back to Projects'}
      </Link>

      {/* Header */}
      <Reveal>
        <div className="glass gradient-border relative overflow-hidden rounded-[2rem] p-8 md:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[hsl(var(--accent)/0.25)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[hsl(var(--primary)/0.18)] blur-3xl" />
          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="icon-3d inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-3xl">
                {project.icon}
              </span>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                {project.category}
              </span>
              {project.caseStudy && (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                  {ko ? '케이스 스터디' : 'Case Study'}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">{name(project)}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {pick(project.overview, project.overviewKo)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground/80">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white"
                >
                  {ko ? '라이브 데모' : 'Live Demo'}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:!border-primary/50"
                >
                  <GitHubIcon />
                  {ko ? '소스 코드' : 'Source Code'}
                </a>
              )}
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:!border-primary/50"
                >
                  <FileText className="h-4 w-4" />
                  {ko ? '케이스 스터디 PDF' : 'Case Study PDF'}
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Case study: problem / approach / result */}
      {caseCards.length > 0 && (
        <section>
          <Heading>{ko ? '케이스 스터디' : 'Case Study'}</Heading>
          <div className="grid gap-5 lg:grid-cols-3">
            {caseCards.map(({ icon: Icon, label, text, tone }, idx) => (
              <Reveal key={label} delay={idx * 0.08} className="h-full">
                <TiltCard max={6} className="h-full rounded-3xl">
                  <div className="glass relative h-full overflow-hidden rounded-3xl p-7">
                    <div className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${tone} opacity-20 blur-2xl`} />
                    <span className={`icon-3d mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white`}>
                      <Icon size={20} />
                    </span>
                    <h3 className="mb-3 text-lg font-bold text-foreground">{label}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Pipeline diagram */}
      {project.pipeline && (
        <section>
          <Heading>{pick(project.pipeline.title, project.pipeline.titleKo)}</Heading>
          <div className="glass gradient-border relative rounded-[2rem] p-6 md:p-8">
            <ol className="relative grid gap-4 lg:grid-cols-5">
              <span
                aria-hidden
                className="absolute left-[27px] top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-primary via-accent to-[hsl(var(--pink))] lg:left-7 lg:right-[calc((100%_-_4rem)/5_-_28px)] lg:top-[27px] lg:bottom-auto lg:h-[2px] lg:w-auto lg:bg-gradient-to-r"
              />
              {project.pipeline.steps.map((step, idx) => (
                <Reveal key={step.name} delay={idx * 0.08}>
                  <li className="relative flex gap-4 lg:flex-col lg:gap-3">
                    <span className="icon-3d relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient font-display text-lg font-bold text-white">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="pt-1 lg:pt-0">
                      <p className="font-display text-base font-bold text-foreground">{pick(step.name, step.nameKo)}</p>
                      <p className="mt-1 text-sm leading-snug text-muted-foreground">{pick(step.desc, step.descKo)}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Reliability */}
      {project.reliability && project.reliability.length > 0 && (
        <section>
          <Heading>{ko ? '신뢰성을 위한 설계' : 'Engineered for Reliability'}</Heading>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.reliability.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.06} className="h-full">
                <TiltCard max={6} className="h-full rounded-2xl">
                  <div className="glass flex h-full items-start gap-4 rounded-2xl p-5">
                    <span className="icon-3d inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white">
                      <ShieldCheck size={18} />
                    </span>
                    <div>
                      <p className="font-bold text-foreground">{pick(item.title, item.titleKo)}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pick(item.desc, item.descKo)}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* What it does */}
      <section>
        <Heading>{ko ? '주요 기능' : 'What It Does'}</Heading>
        <ul className="grid gap-3 sm:grid-cols-2">
          {whatItDoes.map((item) => (
            <li key={item} className="glass flex items-start gap-3 rounded-2xl p-4 text-sm leading-relaxed text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Challenges & solutions */}
      <section>
        <Heading>{ko ? '도전 과제 및 해결 방법' : 'Challenges & Solutions'}</Heading>
        <div className="space-y-4">
          {project.challengesSolutions.map((cs, index) => (
            <Reveal key={cs.challenge} delay={index * 0.05}>
              <div className="glass grid gap-4 rounded-2xl p-6 md:grid-cols-2 md:gap-8">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-400">
                    {ko ? `도전 과제 ${index + 1}` : `Challenge ${index + 1}`}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">{pick(cs.challenge, cs.challengeKo)}</p>
                </div>
                <div className="border-t border-border/50 pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                    {ko ? '해결 방법' : 'Solution'}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pick(cs.solution, cs.solutionKo)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Demo video */}
      {project.videoUrl && (
        <section>
          <Heading>{ko ? '데모 영상' : 'Demo Video'}</Heading>
          <div className="glass aspect-video w-full overflow-hidden rounded-3xl">
            <video controls className="h-full w-full object-cover">
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section>
          <Heading>{ko ? '프로젝트 갤러리' : 'Project Gallery'}</Heading>
          <div className="columns-1 gap-4 space-y-4 md:columns-2">
            {project.images.map((img, index) => (
              <img
                key={img}
                src={img}
                alt={`${name(project)} screenshot ${index + 1}`}
                loading="lazy"
                className="w-full break-inside-avoid rounded-2xl border border-border/50 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              />
            ))}
          </div>
        </section>
      )}

      {/* What I learned */}
      <section>
        <Heading>{ko ? '배운 점' : 'What I Learned'}</Heading>
        <div className="glass flex items-start gap-4 rounded-2xl p-6">
          <span className="icon-3d inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <Lightbulb size={18} />
          </span>
          <p className="leading-relaxed text-muted-foreground">{pick(project.learned, project.learnedKo)}</p>
        </div>
      </section>

      {/* Previous / next */}
      <nav className="flex items-center justify-between gap-4 border-t border-border/50 pt-8">
        {previousProject ? (
          <Link
            href={`/projects/${previousProject.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {name(previousProject)}
          </Link>
        ) : (
          <span />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-2 text-right text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {name(nextProject)}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
};

export default ProjectDetails;
