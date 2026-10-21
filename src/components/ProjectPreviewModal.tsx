import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  Monitor,
  Tablet,
  Smartphone,
  X,
  AlertCircle,
  Layers,
  Sparkles,
  CheckCircle2,
  Code2,
  ArrowLeft,
  Video,
  Play,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ProjectItem } from '../data/projectsData';

interface ProjectPreviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({ project, onClose }) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeError, setIframeError] = useState(false);
  const [activeTab, setActiveTab] = useState<'screenshots' | 'interactive' | 'architecture' | 'video'>('screenshots');
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Reset screenshot index and tab when project changes
  useEffect(() => {
    if (project) {
      setActiveScreenshotIdx(0);
      setActiveTab(project.screenshots && project.screenshots.length > 0 ? 'screenshots' : 'interactive');
    }
  }, [project]);

  if (!project) return null;

  const hasRealUrl = Boolean(project.liveDemoUrl && project.liveDemoUrl.trim().length > 0);

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'w-full';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#26344A]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F3] rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar: Studio Header & Navigation */}
        <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Return to projects action */}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#26344A] bg-[#F2F3F5] hover:bg-gray-200 transition-colors flex items-center gap-1.5"
              title="Return to Projects List"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Projects</span>
            </button>

            <div className="hidden sm:block h-4 w-px bg-gray-200" />

            <div>
              <h3 className="font-editorial text-lg font-bold text-[#26344A] leading-tight">
                {project.title}
              </h3>
              <p className="text-[11px] text-[#747780]">
                Project Visualization Studio • {project.role}
              </p>
            </div>
          </div>

          {/* Viewport switcher */}
          <div className="hidden sm:flex items-center bg-[#F2F3F5] rounded-full p-1 gap-1">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-full text-xs transition-colors flex items-center gap-1 ${
                viewport === 'desktop' ? 'bg-white text-[#26344A] shadow-2xs font-semibold' : 'text-[#747780]'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px]">Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-full text-xs transition-colors flex items-center gap-1 ${
                viewport === 'tablet' ? 'bg-white text-[#26344A] shadow-2xs font-semibold' : 'text-[#747780]'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="text-[11px]">Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-full text-xs transition-colors flex items-center gap-1 ${
                viewport === 'mobile' ? 'bg-white text-[#26344A] shadow-2xs font-semibold' : 'text-[#747780]'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">Mobile</span>
            </button>
          </div>

          {/* Actions & Close */}
          <div className="flex items-center gap-2">
            {hasRealUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors flex items-center gap-1.5"
              >
                <span>Open Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#F2F3F5] hover:bg-gray-200 text-[#303039] transition-colors"
              aria-label="Close studio modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-start bg-[#E8F3ED]/40">
          <div className={`${getViewportWidth()} transition-all duration-300 w-full`}>
            
            {/* If has real URL and embedding allowed */}
            {hasRealUrl && project.canEmbedIframe && !iframeError ? (
              <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md relative">
                <iframe
                  src={project.liveDemoUrl}
                  title={`${project.title} Preview`}
                  className="w-full h-full border-0"
                  onError={() => setIframeError(true)}
                />
              </div>
            ) : (
              /* High-fidelity interactive prototype / studio visualization view */
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-white">
                
                {/* Live Demo Status Notice */}
                {!hasRealUrl && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#EAF2FF] border border-[#DCEBFF] flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#26344A] uppercase tracking-wider">
                        Project Preview Coming Soon (Live Demo in Development)
                      </h4>
                      <p className="text-xs text-[#303039] mt-0.5 leading-relaxed">
                        Shaik Yasmin is actively developing this project. To ensure authentic student reporting, unverified deployment URLs are not fabricated. Explore the verified technical architecture and live workflow simulation below.
                      </p>
                    </div>
                  </div>
                )}

                {/* Project Header info */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F6EAF0] text-[#26344A]">
                      {project.status}
                    </span>
                    <span className="text-xs text-[#747780]">
                      Role: {project.role}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#26344A] mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm font-semibold text-[#486581] mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-[#303039] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Studio View Tabs: Screenshots Gallery / Interactive Simulation / Architecture / Optional Demo Video */}
                <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                  {project.screenshots && project.screenshots.length > 0 && (
                    <button
                      onClick={() => setActiveTab('screenshots')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === 'screenshots'
                          ? 'bg-[#26344A] text-white shadow-2xs'
                          : 'bg-[#F2F3F5] text-[#747780] hover:text-[#26344A]'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Project Screenshots ({project.screenshots.length})</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab('interactive')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'interactive'
                        ? 'bg-[#26344A] text-white shadow-2xs'
                        : 'bg-[#F2F3F5] text-[#747780] hover:text-[#26344A]'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Interactive Workspace Simulation</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'architecture'
                        ? 'bg-[#26344A] text-white shadow-2xs'
                        : 'bg-[#F2F3F5] text-[#747780] hover:text-[#26344A]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Architecture & Data Flow</span>
                  </button>

                  {project.demoVideoPath && (
                    <button
                      onClick={() => setActiveTab('video')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === 'video'
                          ? 'bg-[#26344A] text-white shadow-2xs'
                          : 'bg-[#F2F3F5] text-[#747780] hover:text-[#26344A]'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5 text-sky-600" />
                      <span>Demo Video</span>
                    </button>
                  )}
                </div>

                {/* TAB 0: VERIFIED PROJECT SCREENSHOTS */}
                {activeTab === 'screenshots' && project.screenshots && project.screenshots.length > 0 && (
                  <div className="mb-8 space-y-4">
                    <div className="relative rounded-2xl overflow-hidden bg-[#26344A]/5 border border-gray-200 aspect-16/10 flex items-center justify-center group">
                      <img
                        src={project.screenshots[activeScreenshotIdx]}
                        alt={`${project.title} Screenshot ${activeScreenshotIdx + 1}`}
                        className="w-full h-full object-contain bg-[#1F2937]/90 transition-all duration-300"
                        loading="lazy"
                      />

                      {/* Navigation arrows */}
                      {project.screenshots.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setActiveScreenshotIdx((prev) =>
                                prev === 0 ? project.screenshots.length - 1 : prev - 1
                              )
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#26344A] shadow-md transition-all hover:scale-105"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              setActiveScreenshotIdx((prev) =>
                                prev === project.screenshots.length - 1 ? 0 : prev + 1
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#26344A] shadow-md transition-all hover:scale-105"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Pill indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-xs font-medium">
                        Screenshot {activeScreenshotIdx + 1} of {project.screenshots.length}
                      </div>
                    </div>

                    {/* Thumbnail strip */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {project.screenshots.map((s, idx) => (
                        <button
                          key={s}
                          onClick={() => setActiveScreenshotIdx(idx)}
                          className={`relative shrink-0 w-20 sm:w-24 aspect-16/10 rounded-lg overflow-hidden border-2 transition-all ${
                            activeScreenshotIdx === idx
                              ? 'border-[#26344A] shadow-sm scale-102'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={s}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#747780] italic text-center">
                      Verified screenshots from Shaik Yasmin's development environment and project UI prototypes.
                    </p>
                  </div>
                )}

                {/* TAB 1: INTERACTIVE WORKSPACE SIMULATION */}
                {activeTab === 'interactive' && (
                  <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-gray-200 mb-8">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span className="text-xs font-mono text-[#747780] ml-2">
                          {project.id === 'student-ai-copilot' ? 'copilot_workspace.py' : 'performance_visualizer.py'}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#26344A] px-2 py-0.5 rounded bg-white border border-gray-200">
                        Interactive Simulation
                      </span>
                    </div>

                    {project.id === 'student-ai-copilot' ? (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl bg-white border border-gray-100 flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#EAF2FF] flex items-center justify-center text-xs font-bold text-[#26344A] shrink-0">
                            Q
                          </div>
                          <div className="text-xs text-[#303039]">
                            <span className="font-semibold block text-[#26344A] mb-1">Student Doubt Input:</span>
                            "How do Python list comprehensions work compared to a traditional for-loop?"
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#E8F3ED] border border-[#CBDAD1] flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#26344A] flex items-center justify-center text-xs font-bold text-white shrink-0">
                            AI
                          </div>
                          <div className="text-xs text-[#26344A] space-y-2.5">
                            <span className="font-semibold block">Step-by-step conceptual breakdown:</span>
                            <p>1. <strong>Syntax pattern</strong>: <code>[expression for item in iterable if condition]</code></p>
                            <div className="p-3 rounded-lg bg-white/95 font-mono text-[11px] text-[#303039] border border-gray-200">
                              # 1. Traditional imperative loop<br />
                              squares = []<br />
                              for x in range(5): squares.append(x**2)<br /><br />
                              # 2. Pythonic List Comprehension<br />
                              squares = [x**2 for x in range(5)]
                            </div>
                            <p className="text-[11px] text-[#486581]">
                              💡 Telugu regional language translation available on demand for students!
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-3.5 rounded-xl bg-white border border-gray-100 text-center">
                            <div className="text-[10px] text-[#747780] font-medium uppercase tracking-wider">Core Theory Avg</div>
                            <div className="text-xl font-bold font-editorial text-[#26344A] mt-1">84%</div>
                            <div className="text-[10px] text-emerald-600 font-semibold">Consistent Track</div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white border border-gray-100 text-center">
                            <div className="text-[10px] text-[#747780] font-medium uppercase tracking-wider">Lab Practical Score</div>
                            <div className="text-xl font-bold font-editorial text-[#26344A] mt-1">92%</div>
                            <div className="text-[10px] text-emerald-600 font-semibold">Demonstrated Strength</div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white border border-gray-100 text-center">
                            <div className="text-[10px] text-[#747780] font-medium uppercase tracking-wider">Exam Priority Rec.</div>
                            <div className="text-xl font-bold font-editorial text-[#26344A] mt-1">Math III</div>
                            <div className="text-[10px] text-amber-600 font-semibold">+3 hrs study suggested</div>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-gray-100 text-xs text-[#747780] leading-relaxed">
                          Visual semester progression and credit tracking without exaggerated analytics or fabricated metrics.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: ARCHITECTURE & DATA FLOW */}
                {activeTab === 'architecture' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-5 rounded-2xl bg-[#F2F3F5]/60 border border-gray-200/80">
                      <h4 className="font-editorial text-base font-bold text-[#26344A] mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#26344A]" />
                        Technical Architecture
                      </h4>
                      <ul className="space-y-2.5 text-xs text-[#303039]">
                        {project.previewDetails.architecture.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F2F3F5]/60 border border-gray-200/80">
                      <h4 className="font-editorial text-base font-bold text-[#26344A] mb-3 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#26344A]" />
                        User Flow & Logic
                      </h4>
                      <ul className="space-y-2.5 text-xs text-[#303039]">
                        {project.previewDetails.userFlow.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#26344A] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 3: OPTIONAL DEMO VIDEO */}
                {activeTab === 'video' && project.demoVideoPath && (
                  <div className="mb-8 p-4 rounded-2xl bg-black/90 aspect-video flex items-center justify-center">
                    <video controls className="w-full h-full object-contain">
                      <source src={project.demoVideoPath} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {/* Technologies and Links Footer */}
                <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#747780] mr-1">Technologies:</span>
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#FAF8F3] border border-gray-200 text-xs font-medium text-[#26344A]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full text-xs font-semibold text-[#26344A] bg-white border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Source</span>
                    </a>

                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors"
                    >
                      Return to Projects
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
