import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Eye,
  Sparkles,
  Bot,
  BarChart3,
  CheckCircle2,
  Code2,
  FolderPlus,
  Play
} from 'lucide-react';
import { projectsData, ProjectItem } from '../data/projectsData';
import { ProjectPreviewModal } from './ProjectPreviewModal';
import { BotanicalCornerVine, BotanicalDivider } from './BotanicalDecorations';

interface ProjectsProps {
  onOpenAssetGuide?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenAssetGuide }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  const regularProjects = projectsData.filter((p) => p.id !== featuredProject.id);

  return (
    <section id="projects" className="py-24 relative bg-[#FAF8F3] overflow-hidden">
      {/* Botanical Corner Accent for Projects Section */}
      <BotanicalCornerVine position="top-left" size="md" className="top-4 left-2 sm:left-4 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
              <span>Project Visualization Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight mb-2">
              Explore My Projects in Action
            </h2>
            <p className="text-sm sm:text-base text-[#747780] max-w-xl mb-4">
              Go beyond the project card. Preview the experience, explore the interface, and discover how each project works.
            </p>
            <BotanicalDivider centered={false} className="opacity-60" />
          </div>
        </div>

        {/* 1. PROMINENT FEATURED PROJECT: STUDENT AI COPILOT */}
        <div className="mb-14">
          <div className="relative rounded-3xl bg-white border border-gray-200/80 shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12">
            <BotanicalCornerVine position="bottom-right" size="sm" className="bottom-0 right-0 opacity-25" />

            
            {/* Top decorative badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] text-xs font-bold text-[#26344A]">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Featured Project</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F3ED] text-[#26344A]">
                {featuredProject.status}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Information */}
              <div className="lg:col-span-7">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-[#26344A] mb-2">
                  {featuredProject.title}
                </h3>
                <p className="text-sm font-semibold text-[#486581] mb-4">
                  {featuredProject.tagline}
                </p>
                <p className="text-sm sm:text-base text-[#303039] leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {/* Key Features Bullet Points */}
                <div className="space-y-2 mb-8">
                  {featuredProject.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#303039]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-[#FAF8F3] border border-gray-200 text-xs font-medium text-[#26344A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons as requested */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(featuredProject)}
                    className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-all shadow-xs hover:shadow flex items-center gap-2 group"
                  >
                    <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Visualize Project</span>
                  </button>

                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-full text-xs font-semibold text-[#26344A] bg-white hover:bg-[#F2F3F5] border border-gray-300 transition-colors flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Source</span>
                  </a>

                  {featuredProject.liveDemoUrl ? (
                    <a
                      href={featuredProject.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-full text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center gap-1.5"
                    >
                      <span>Open Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-[#747780] italic px-2">
                      (Live Demo Coming Soon)
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Dashboard Thumbnail */}
              <div className="lg:col-span-5">
                <div
                  onClick={() => setSelectedProject(featuredProject)}
                  className="rounded-2xl p-6 bg-gradient-to-br from-[#EAF2FF] via-[#F6EAF0] to-[#EEE9FA] border border-white shadow-sm cursor-pointer hover:shadow-md transition-all group"
                  title="Click to visualize project experience"
                >
                  <div className="rounded-xl bg-white p-5 shadow-xs border border-white/60 mb-4 transition-transform group-hover:scale-[1.02]">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#26344A] text-white flex items-center justify-center font-bold text-xs">
                          AI
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#26344A]">Student Copilot</div>
                          <div className="text-[10px] text-[#747780]">Active Workspace</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Interactive Studio
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#303039]">
                      <div className="p-2.5 rounded-lg bg-[#F2F3F5] text-[11px] font-mono text-[#486581]">
                        &gt; Python Doubt: Recursion vs Iteration
                      </div>
                      <div className="p-3 rounded-lg bg-[#E8F3ED] text-[11px] leading-relaxed">
                        ✓ Breaks recursion into base-case and recursive step diagrams with Telugu translation on demand.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#26344A]">
                    <span className="flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5 text-sky-600" />
                      Academic Workflow Engine
                    </span>
                    <span className="text-[11px] text-[#486581] group-hover:text-[#26344A] flex items-center gap-1">
                      Visualize Project &rarr;
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2. SECONDARY PROJECTS & FUTURE EXTENSION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Project 2: STUDENT PERFORMANCE ANALYSER */}
          {regularProjects.map((project) => (
            <div
              key={project.id}
              className="p-8 rounded-3xl bg-white border border-gray-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F6EAF0] flex items-center justify-center text-[#26344A]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F2F3F5] text-[#26344A]">
                    {project.status}
                  </span>
                </div>

                <h4 className="font-editorial text-2xl font-bold text-[#26344A] mb-2">
                  {project.title}
                </h4>
                <p className="text-xs font-semibold text-[#486581] mb-3">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#303039] leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="space-y-2 mb-6">
                  {project.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#303039]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#FAF8F3] border border-gray-200 text-[11px] font-medium text-[#26344A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visualize Project</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#26344A] bg-white border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Source</span>
                </a>

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2.5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                  >
                    <span>Open Live Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Extensible Future Projects Card */}
          <div className="p-8 rounded-3xl border-2 border-dashed border-[#CBDAD1] bg-white/50 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F3ED] flex items-center justify-center text-[#26344A] mb-4">
              <FolderPlus className="w-6 h-6 text-[#26344A]" />
            </div>
            <h4 className="font-editorial text-xl font-bold text-[#26344A] mb-2">
              Future Engineering Projects
            </h4>
            <p className="text-xs text-[#747780] max-w-sm mb-6 leading-relaxed">
              New projects can be added anytime by adding an entry in <code>src/data/projectsData.ts</code>. The visualization studio handles interactive previews, Github links, and tech tags automatically.
            </p>
            {onOpenAssetGuide && (
              <button
                onClick={onOpenAssetGuide}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#26344A] bg-white hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                Learn How to Add Projects
              </button>
            )}
          </div>

        </div>

        {/* Project Preview & Visualization Studio Modal */}
        <ProjectPreviewModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
