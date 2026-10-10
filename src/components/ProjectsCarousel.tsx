'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Lightbox } from './Lightbox';
import { XIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { TiltCard } from './fx/TiltCard';
import { Reveal } from './fx/Reveal';

export default function ProjectsCarousel() {
  const { getText } = useLanguage();
  const { selectedSkill, setSelectedSkill } = useUI();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const projects = [
    {
      name: getText("CarbonShine Detailing"),
      badge: getText("Lead Gen"),
      badgeColor: "bg-blue-500/20 text-blue-400",
      stack: ["Next.js", "Tailwind", "Formspree"],
      description: getText("Premium dark mode car detailing studio..."),
      longDescription: getText("CarbonShine_Long_Desc"),
      image: "/images/carbonshine 1.png",
      gallery: [
        "/images/carbonshine 1.png",
        "/images/carbonshine 2.png",
        "/images/carbonshine 3.png",
        "/images/carbonshine 4.png",
        "/images/carbonshine 5.png",
        "/images/carbonshine 6.png",
        "/images/carbonshine 7.png",
        "/images/carbonshine 8.png",
      ],
      liveUrl: "https://carbon-shine-detailing.vercel.app",
      githubUrl: "https://github.com/sweety-HJH223/CarbonShine-Detailing",
      comingSoon: false
    },
    {
      name: getText("Paws & Play"),
      badge: getText("E-Commerce"),
      badgeColor: "bg-green-500/20 text-green-400",
      stack: ["Next.js", "Stripe", "Tailwind"],
      description: getText("Smart pet toy product page..."),
      longDescription: getText("Paws_Play_Long_Desc"),
      image: "/images/payplay 1.png",
      gallery: [
        "/images/payplay 1.png",
        "/images/payplay 2.png",
        "/images/payplay 3.png",
        "/images/payplay 4.png",
        "/images/payplay 5.png",
        "/images/payplay 6.png",
        "/images/payplay 7.png",
        "/images/payplay 8.png",
      ],
      liveUrl: "https://paws-play-ten.vercel.app/",
      githubUrl: "https://github.com/sweety-HJH223/paws-play",
      comingSoon: false

      
    },
    {
      name: getText("TaskFlow AI"),
      badge: getText("SaaS"),
      badgeColor: "bg-purple-500/20 text-purple-400",
      stack: ["Next.js", "Tailwind", "AI", "Framer Motion", "Formspree"],
      description: getText("AI-powered freelance automation SaaS..."),
      longDescription: getText("TaskFlow_AI_Long_Desc"),
      image: "/images/taskflow 1.png",
      gallery: [
        "/images/taskflow 1.png",
        "/images/taskflow 2.png",
        "/images/taskflow 3.png",
        "/images/taskflow 4.png",
        "/images/taskflow 5.png",
        "/images/taskflow 6.png",
        "/images/taskflow 7.png",
      ],
      liveUrl: "https://taskflow-ai-orcin.vercel.app/",
      githubUrl: "https://github.com/sweety-HJH223/taskflow-ai",
      comingSoon: false
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const openGallery = (gallery: string[]) => {
    if (gallery.length > 0) {
      setSelectedGallery(gallery);
      setGalleryIndex(0);
    }
  };

  return (
    <div className="mb-24">
      {/* Header */}
      <Reveal className="mb-10 text-center md:text-left">
        <div className="flex flex-col gap-3">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">{getText("FEATURED SOLUTIONS")}</span>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {getText("Strategic Builds")}
          </h3>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto md:mx-0">
            {getText("Transforming complex business requirements into intelligent, production-ready digital experiences.")}
          </p>
          {selectedSkill && (
            <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs text-muted-foreground">Filtering by stack:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-bold text-primary">
                {selectedSkill}
                <button onClick={() => setSelectedSkill(null)} className="hover:text-foreground ml-1 font-extrabold text-[14px]">
                  ×
                </button>
              </span>
            </div>
          )}
        </div>
      </Reveal>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <TiltCard max={6} className="h-full rounded-3xl">
              <ProjectCard
                project={project}
                onOpenGallery={() => openGallery(project.gallery)}
                selectedSkill={selectedSkill}
              />
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative px-12">
        <div className="overflow-hidden">
           <ProjectCard 
             project={projects[currentIndex]} 
             onOpenGallery={() => openGallery(projects[currentIndex].gallery)} 
             selectedSkill={selectedSkill}
           />
        </div>
        
        <button 
          onClick={prevSlide}
          className="glass absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-foreground hover:text-primary transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextSlide}
          className="glass absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-foreground hover:text-primary transition-colors"
          aria-label="Next project"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Gallery Lightbox */}
      {selectedGallery && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10">
          <button 
            className="absolute top-6 right-6 text-white hover:text-cyan-400 transition-colors z-[110]"
            onClick={() => setSelectedGallery(null)}
          >
            <XIcon size={40} />
          </button>

          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex((prev) => (prev - 1 + selectedGallery.length) % selectedGallery.length);
            }}
          >
            <ChevronLeft size={48} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={selectedGallery[galleryIndex]} 
              alt={`Gallery image ${galleryIndex + 1}`} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-4 py-1 rounded-full">
              {galleryIndex + 1} / {selectedGallery.length}
            </div>
          </div>

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex((prev) => (prev + 1) % selectedGallery.length);
            }}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpenGallery, selectedSkill }: { project: any; onOpenGallery: () => void; selectedSkill: string | null }) {
  const { getText } = useLanguage();
  const isFilterActive = !!selectedSkill;
  const isMatch = isFilterActive 
    ? project.stack.some((tech: string) => tech.toLowerCase() === selectedSkill.toLowerCase()) 
    : false;

  return (
    <div 
      className={`glass group relative rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col ${
        isFilterActive
          ? isMatch
            ? "!border-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.25)]"
            : "opacity-30 grayscale-[30%]"
          : "hover:!border-primary/30 hover:shadow-[0_30px_60px_-25px_hsl(var(--accent)/0.5)]"
      }`}
    >
      {/* Top Image - Flexible Aspect Ratio */}
      <div className="relative w-full shrink-0 overflow-hidden cursor-pointer" onClick={onOpenGallery}>
        <Image
          src={project.image}
          alt={project.name}
          width={1920}
          height={900}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="block w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
            {getText("View Gallery")}
          </span>
        </div>
        {project.comingSoon && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-bold">
              {getText("In Progress")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-foreground font-bold text-lg">{project.name}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${project.badgeColor}`}>
            {project.badge}
          </span>
        </div>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech: string, i: number) => {
            const isTagActive = selectedSkill?.toLowerCase() === tech.toLowerCase();
            return (
              <span 
                key={i} 
                className={`text-[10px] px-2 py-0.5 rounded-full border transition-all duration-300 ${
                  isTagActive 
                    ? "text-primary bg-primary/10 border-primary/30" 
                    : "text-muted-foreground bg-secondary/60 border-border/60"
                }`}
              >
                {tech}
              </span>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="mb-6">
           <h4 className="text-xs font-bold text-primary uppercase mb-2 tracking-wider">{getText("Project Details")}</h4>
           <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-3">
             {project.longDescription}
           </p>
        </div>

        {/* Buttons at bottom */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <a
            href={project.comingSoon ? '#' : project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all
              ${project.comingSoon 
                ? 'border border-border text-muted-foreground cursor-not-allowed' 
                : 'btn-3d bg-brand-gradient text-white [--btn-depth:4px]'}`}
            onClick={(e) => project.comingSoon && e.preventDefault()}
          >
            {getText("Live Demo →")}
          </a>
          <a
            href={project.comingSoon ? '#' : project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all
              ${project.comingSoon 
                ? 'border-border text-muted-foreground cursor-not-allowed' 
                : 'border-border/80 text-foreground hover:border-primary/50 hover:text-primary'}`}
            onClick={(e) => project.comingSoon && e.preventDefault()}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
